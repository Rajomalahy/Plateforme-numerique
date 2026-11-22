using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore; 
using PlateformeAPI.Data;
using PlateformeAPI.Models;
using UglyToad.PdfPig;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CvController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public CvController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // ✅ MODIFIÉ : Renvoie maintenant l'analyse complète du CV existant
    [HttpGet("mon-cv")]
    public async Task<IActionResult> GetMonCv()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId))
            return Unauthorized();

        var demandeur = await _context.Utilisateurs
            .OfType<Demandeur>()
            .FirstOrDefaultAsync(d => d.Id == userId);

        if (demandeur == null)
            return NotFound(new { message = "Profil introuvable." });

        if (string.IsNullOrEmpty(demandeur.UrlCv))
        {
            return Ok(new { urlCv = (string)null, analyse = (object)null });
        }

        // Le fichier existe en base, on tente de le réanalyser pour afficher les détails
        var filePath = Path.Combine(_env.WebRootPath ?? "wwwroot", demandeur.UrlCv.TrimStart('/'));
        
        if (System.IO.File.Exists(filePath))
        {
            try
            {
                var texteCv = await ExtraireTexteDuFichier(filePath, Path.GetFileName(demandeur.UrlCv));
                if (!string.IsNullOrWhiteSpace(texteCv) && !texteCv.StartsWith("Erreur"))
                {
                    var analyse = AnalyserContenuCv(texteCv, demandeur);
                    
                    // Mise à jour du score en base si l'algorithme a changé entre-temps
                    if (demandeur.TauxCompletion != analyse.ScoreGlobal)
                    {
                        demandeur.TauxCompletion = analyse.ScoreGlobal;
                        await _context.SaveChangesAsync();
                    }

                    return Ok(new 
                    { 
                        urlCv = demandeur.UrlCv, 
                        analyse = analyse // ✅ On renvoie l'analyse complète !
                    });
                }
            }
            catch { /* En cas d'erreur de lecture, on passe au fallback */ }
        }

        // Fallback : on renvoie juste l'URL si le fichier est illisible
        return Ok(new { urlCv = demandeur.UrlCv, analyse = (object)null });
    }

    [HttpPost("analyser")]
    public async Task<IActionResult> AnalyserCv(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "Aucun fichier fourni." });

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out int userId))
            return Unauthorized();

        var demandeur = await _context.Utilisateurs
            .OfType<Demandeur>()
            .FirstOrDefaultAsync(d => d.Id == userId);

        if (demandeur == null)
            return NotFound(new { message = "Profil introuvable." });

        var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", "cv");
        if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{userId}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var cvUrl = $"/uploads/cv/{fileName}";
        demandeur.UrlCv = cvUrl;
        
        var texteCv = await ExtraireTexteDuFichier(filePath, file.FileName);
        
        if (string.IsNullOrWhiteSpace(texteCv) || texteCv.StartsWith("Erreur"))
        {
            return BadRequest(new { message = "Impossible de lire le contenu de ce PDF. Assurez-vous qu'il s'agit d'un PDF texte." });
        }

        var analyse = AnalyserContenuCv(texteCv, demandeur);
        demandeur.TauxCompletion = analyse.ScoreGlobal;
        await _context.SaveChangesAsync();

        return Ok(analyse);
    }

    private async Task<string> ExtraireTexteDuFichier(string filePath, string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLower();
        if (extension == ".pdf")
        {
            try
            {
                using (var document = PdfDocument.Open(filePath))
                {
                    var textBuilder = new System.Text.StringBuilder();
                    foreach (var page in document.GetPages())
                    {
                        textBuilder.AppendLine(page.Text);
                    }
                    return textBuilder.ToString();
                }
            }
            catch (Exception ex)
            {
                return $"Erreur de lecture PDF: {ex.Message}";
            }
        }
        return "Format non supporté. Veuillez utiliser un PDF.";
    }

    private CvAnalyseDto AnalyserContenuCv(string texte, Demandeur demandeur)
    {
        var analyse = new CvAnalyseDto();
        int scoreTotal = 0;
        var texteSansAccents = RemoveDiacritics(texte.ToLower());

        int scoreATS = 0;
        foreach (var mot in new[] { "experience", "competence", "formation", "diplome", "reference" })
            if (texteSansAccents.Contains(mot)) scoreATS += 6;
        scoreATS = Math.Min(30, scoreATS);
        scoreTotal += scoreATS;
        analyse.CompatibiliteATS = new CategorieAnalyse { Score = scoreATS, MaxScore = 30, ElementsAmeliorer = scoreATS < 18 ? new List<string> { "Assurez-vous d'avoir des sections claires : Expériences, Formations, Compétences." } : new List<string>() };

        int scoreCoord = 0;
        if (texte.Contains("@")) scoreCoord += 4;
        if (System.Text.RegularExpressions.Regex.IsMatch(texte, @"(\+261|0)\s*\d{2,3}\s*\d{2,4}\s*\d{2,4}")) scoreCoord += 4;
        if (!string.IsNullOrEmpty(demandeur.Adresse) || texteSansAccents.Contains("fianarantsoa") || texteSansAccents.Contains("antananarivo")) scoreCoord += 4;
        if (texteSansAccents.Contains("linkedin") || texte.Contains("in1@")) scoreCoord += 4;
        if (!string.IsNullOrEmpty(demandeur.Ville)) scoreCoord += 4;
        scoreTotal += scoreCoord;
        var ameliorationsCoord = new List<string>();
        if (!System.Text.RegularExpressions.Regex.IsMatch(texte, @"(\+261|0)\s*\d{2,3}\s*\d{2,4}\s*\d{2,4}")) ameliorationsCoord.Add("Format de téléphone détecté, assurez-vous qu'il est bien visible.");
        if (!texteSansAccents.Contains("linkedin") && !texte.Contains("in1@")) ameliorationsCoord.Add("Ajoutez un lien vers votre profil LinkedIn ou portfolio.");
        analyse.Coordonnees = new CategorieAnalyse { Score = scoreCoord, MaxScore = 20, ElementsAmeliorer = ameliorationsCoord };

        int scoreSoft = 0;
        foreach (var skill in new[] { "communication", "equipe", "leadership", "autonomie", "creativite", "adaptabilite", "rigoureuse", "organisee", "ponctuelle", "curieuse", "honnete", "sociable" })
            if (texteSansAccents.Contains(skill)) scoreSoft += 3;
        scoreSoft = Math.Min(15, scoreSoft);
        scoreTotal += scoreSoft;
        analyse.SoftSkills = new CategorieAnalyse { Score = scoreSoft, MaxScore = 15, ElementsAmeliorer = scoreSoft < 9 ? new List<string> { "Mentionnez vos qualités personnelles (ex: rigoureux, esprit d'équipe, organisé)." } : new List<string>() };

        int scoreExp = 0;
        if (texteSansAccents.Contains("experience") || texteSansAccents.Contains("professionnel")) scoreExp += 5;
        if (System.Text.RegularExpressions.Regex.IsMatch(texte, @"\b(2020|2021|2022|2023|2024|2025|2026)\b")) scoreExp += 5; 
        if (texteSansAccents.Contains("developpe") || texteSansAccents.Contains("gestion") || texteSansAccents.Contains("projet") || texteSansAccents.Contains("conception") || texteSansAccents.Contains("integration")) scoreExp += 5;
        if (texteSansAccents.Contains("client") || texteSansAccents.Contains("besoins")) scoreExp += 5;
        scoreTotal += scoreExp;
        analyse.Experiences = new CategorieAnalyse { Score = scoreExp, MaxScore = 20, ElementsAmeliorer = scoreExp < 15 ? new List<string> { "Détaillez vos projets ou expériences en mentionnant les années et les technologies utilisées." } : new List<string>() };

        int scoreImpact = 0;
        foreach (var mot in new[] { "resultat", "augmentation", "amelioration", "succes", "realise", "valide", "fluide", "performante", "%", "ariary", "mga", "securise", "complete" })
            if (texteSansAccents.Contains(mot)) scoreImpact += 2;
        scoreImpact = Math.Min(15, scoreImpact);
        scoreTotal += scoreImpact;
        analyse.Impact = new CategorieAnalyse { Score = scoreImpact, MaxScore = 15, ElementsAmeliorer = scoreImpact < 8 ? new List<string> { "Décrivez les résultats concrets de vos actions (ex: 'solution validée par le client', 'application performante')." } : new List<string>() };

        analyse.ScoreGlobal = scoreTotal;
        return analyse;
    }

    private string RemoveDiacritics(string text)
    {
        var normalizedString = text.Normalize(System.Text.NormalizationForm.FormD);
        var stringBuilder = new System.Text.StringBuilder();
        foreach (var c in normalizedString)
        {
            if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c) != System.Globalization.UnicodeCategory.NonSpacingMark)
                stringBuilder.Append(c);
        }
        return stringBuilder.ToString().Normalize(System.Text.NormalizationForm.FormC).ToLower();
    }
}

public class CvAnalyseDto
{
    public int ScoreGlobal { get; set; }
    public CategorieAnalyse CompatibiliteATS { get; set; } = new();
    public CategorieAnalyse Coordonnees { get; set; } = new();
    public CategorieAnalyse SoftSkills { get; set; } = new();
    public CategorieAnalyse Experiences { get; set; } = new();
    public CategorieAnalyse Impact { get; set; } = new();
}

public class CategorieAnalyse
{
    public int Score { get; set; }
    public int MaxScore { get; set; }
    public List<string> ElementsAmeliorer { get; set; } = new();
}