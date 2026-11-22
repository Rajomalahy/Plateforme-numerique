using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using PlateformeAPI.Data;
using PlateformeAPI.DTOs;
using PlateformeAPI.Models;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OffreController : ControllerBase
{
    private readonly AppDbContext _context;

    public OffreController(AppDbContext context) => _context = context;

    // Obtenir les offres de l'entreprise connectée
    [HttpGet("mes-offres")]
    public async Task<IActionResult> GetMesOffres()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        var userId = int.Parse(userIdClaim);

        var offres = await _context.Offres
            .Where(o => o.IdEntreprise == userId)
            .Select(o => new
            {
                o.Id,
                o.Titre,
                o.Logo,
                VilleNom = o.Ville.Nom,
                o.TypeContrat,
                o.DatePublication,
                o.Statut,
                NbCandidatures = _context.Candidatures.Count(c => c.IdOffre == o.Id)
            })
            .OrderByDescending(o => o.DatePublication)
            .ToListAsync();

        return Ok(offres);
    }

    // Publier une nouvelle offre 
    [HttpPost("creer")]
    public async Task<IActionResult> CreerOffre([FromForm] CreerOffreDto dto, IFormFile? LogoFile) // ✅ AJOUT DE IFormFile? LogoFile ET [FromForm]
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié" });

        var userId = int.Parse(userIdClaim);

        // Vérification
        var entreprise = await _context.Utilisateurs.OfType<Entreprise>().FirstOrDefaultAsync(e => e.Id == userId);
        if (entreprise == null || !entreprise.EstProfilComplet)
            return BadRequest(new { message = "Vous devez compléter votre profil entreprise avant de publier une offre." });

        // Vérifier que la ville existe
        var ville = await _context.Villes.FindAsync(dto.VilleId);
        if (ville == null) return BadRequest(new { message = "Ville invalide." });

        // ✅ Gestion du fichier Logo
        string? logoPath = entreprise.UrlLogo; // Par défaut, on prend le logo du profil

        if (LogoFile != null && LogoFile.Length > 0)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "logos");
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(LogoFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await LogoFile.CopyToAsync(fileStream);
            }

            logoPath = $"/uploads/logos/{uniqueFileName}";
        }

        // 1. Créer l'offre
        var nouvelleOffre = new Offres
        {
            IdEntreprise = userId,
            IdVille = ville.Id,
            Titre = dto.Titre,
            Description = dto.Description,
            TypeContrat = dto.TypeContrat,
            SalaireMin = dto.SalaireMin,
            SalaireMax = dto.SalaireMax,
            DateLimite = dto.DateLimite,
            Lieu = dto.Lieu,
            DatePublication = DateTime.UtcNow,
            Statut = "Active",
            Logo = logoPath // ✅ CORRECTION : On utilise la variable logoPath, pas entreprise.UrlLogo directement
        };

        _context.Offres.Add(nouvelleOffre);
        await _context.SaveChangesAsync();

        // Lier les compétences 
        if (dto.CompetenceIds != null)
        {
            foreach (var compId in dto.CompetenceIds)
            {
                if (await _context.Competences.AnyAsync(c => c.Id == compId))
                {
                    _context.OffreCompetences.Add(new OffreCompetence
                    {
                        IdOffre = nouvelleOffre.Id,
                        IdCompetence = compId
                    });
                }
            }
        }

        await _context.SaveChangesAsync(); // On sauvegarde les liens

        entreprise.NbPostesDisponibles += 1;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Offre publiée avec succès !", idOffre = nouvelleOffre.Id });
    }// Publier une nouvelle offre 


    //  MODIFIER une offre
    // MODIFIER une offre
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOffre(int id, [FromForm] CreerOffreDto dto, IFormFile? LogoFile) // ✅ AJOUT DE IFormFile? LogoFile ET [FromForm]
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var offre = await _context.Offres.FirstOrDefaultAsync(o => o.Id == id && o.IdEntreprise == userId);
        if (offre == null) return NotFound(new { message = "Offre introuvable ou vous n'avez pas les droits." });

        
        if (LogoFile != null && LogoFile.Length > 0)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "logos");
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(LogoFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await LogoFile.CopyToAsync(fileStream);
            }

            offre.Logo = $"/uploads/logos/{uniqueFileName}";
        }

        offre.Titre = dto.Titre;
        offre.Description = dto.Description;
        offre.TypeContrat = dto.TypeContrat;
        offre.IdVille = dto.VilleId;
        offre.SalaireMin = dto.SalaireMin;
        offre.SalaireMax = dto.SalaireMax;
        offre.DateLimite = dto.DateLimite;
        offre.Lieu = dto.Lieu;

        // Mise à jour des compétences : on supprime les anciennes et on met les nouvelles
        var anciennesCompetences = await _context.OffreCompetences.Where(oc => oc.IdOffre == id).ToListAsync();
        _context.OffreCompetences.RemoveRange(anciennesCompetences);

        if (dto.CompetenceIds != null)
        {
            foreach (var compId in dto.CompetenceIds)
            {
                if (await _context.Competences.AnyAsync(c => c.Id == compId))
                {
                    _context.OffreCompetences.Add(new OffreCompetence { IdOffre = id, IdCompetence = compId });
                }
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Offre modifiée avec succès !" });
    }

    //  SUPPRIMER une offre
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOffre(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var offre = await _context.Offres.FirstOrDefaultAsync(o => o.Id == id && o.IdEntreprise == userId);
        if (offre == null) return NotFound(new { message = "Offre introuvable." });

        _context.Offres.Remove(offre);

        // On décrémente le nombre de postes disponibles
        var entreprise = await _context.Utilisateurs.OfType<Entreprise>().FirstOrDefaultAsync(e => e.Id == userId);
        if (entreprise != null && entreprise.NbPostesDisponibles > 0)
        {
            entreprise.NbPostesDisponibles -= 1;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Offre supprimée avec succès !" });
    }

    // Récupérer les détails d'une offre pour pré-remplir le formulaire de modification
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOffreById(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var offre = await _context.Offres
            .Include(o => o.Ville)
            .Include(o => o.OffreCompetences).ThenInclude(oc => oc.Competence)
            .FirstOrDefaultAsync(o => o.Id == id && o.IdEntreprise == userId);

        if (offre == null) return NotFound(new { message = "Offre introuvable." });

        return Ok(new
        {
            offre.Id,
            offre.Titre,
            offre.Description,
            offre.TypeContrat,
            VilleId = offre.IdVille,
            offre.Lieu,
            offre.Logo,
            offre.SalaireMin,
            offre.SalaireMax,
            DateLimite = offre.DateLimite?.ToString("yyyy-MM-dd"),
            CompetenceIds = offre.OffreCompetences.Select(oc => oc.IdCompetence).ToList()
        });
    }

    [HttpGet("offres-publiques")]
    [AllowAnonymous]
    public async Task<IActionResult> GetOffresPubliques(string? motCle, string? ville, string? typeContrat) 
    {
        IQueryable<Offres> query = _context.Offres
            .Include(o => o.Ville)
            .Include(o => o.Entreprise)
            .Where(o => o.Statut == "Active" || o.Statut == "Publiée");

        if (!string.IsNullOrWhiteSpace(motCle))
        {
            var mots = motCle.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            foreach (var mot in mots)
            {
                var m = mot;
                query = query.Where(o =>
                    o.Titre.ToLower().Contains(m) ||
                    o.Description.ToLower().Contains(m) ||
                    o.TypeContrat.ToLower().Contains(m) ||
                    o.Ville.Nom.ToLower().Contains(m) ||
                    (o.Entreprise.NomSociete != null && o.Entreprise.NomSociete.ToLower().Contains(m))
                );
            }
        }

        if (!string.IsNullOrWhiteSpace(ville))
        {
            var villeLower = ville.Trim().ToLower();
            query = query.Where(o => o.Ville.Nom.ToLower().Contains(villeLower));
        }

        if (!string.IsNullOrWhiteSpace(typeContrat))
        {
            var contratLower = typeContrat.Trim().ToLower();
            query = query.Where(o => o.TypeContrat.ToLower() == contratLower);
        }

        var offres = await query
            .Select(o => new
            {
                o.Id,
                o.Titre,
                o.Description,
                o.TypeContrat,
                Ville = o.Ville.Nom,
                Entreprise = o.Entreprise.NomSociete,
                Logo = o.Logo ?? o.Entreprise.UrlLogo,
                DatePublication = o.DatePublication,
                SalaireMin = o.SalaireMin,
                SalaireMax = o.SalaireMax
            })
            .OrderByDescending(o => o.DatePublication)
            .ToListAsync();

        return Ok(offres);
    }

    [HttpGet("mes-candidatures")]
    public async Task<IActionResult> GetMesCandidatures()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        var userId = int.Parse(userIdClaim);

        var candidatures = await _context.Candidatures
            .Include(c => c.Offre)
            .Include(c => c.Candidat)
            .Where(c => c.Offre.IdEntreprise == userId)
            .Select(c => new
            {
                c.Id,
                // Sécurité : on vérifie que le candidat existe avant de lire ses infos
                NomCandidat = c.Candidat != null ? (c.Candidat.Prenoms + " " + c.Candidat.Nom) : "Candidat inconnu",
                TitreOffre = c.Offre.Titre,
                DateCandidature = c.Date,
                c.Statut,
                UrlCv = c.Candidat != null ? c.Candidat.UrlCv : null
            })
            .OrderByDescending(c => c.DateCandidature)
            .ToListAsync();

        return Ok(candidatures);
    }

    // 6. Changer le statut d'une candidature (Avec Historique - RG18)
    [HttpPut("candidature/{id}/statut")]
    public async Task<IActionResult> UpdateStatutCandidature(int id, [FromBody] string nouveauStatut)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        // On vérifie que la candidature existe ET qu'elle appartient bien à une offre de CETTE entreprise
        var candidature = await _context.Candidatures
            .Include(c => c.Offre)
            .FirstOrDefaultAsync(c => c.Id == id && c.Offre.IdEntreprise == userId);

        if (candidature == null)
            return NotFound(new { message = "Candidature introuvable ou vous n'avez pas les droits." });

        // RG18 : Enregistrer l'historique AVANT de changer le statut
        var historique = new HistoriqueCandidature
        {
            IdCandidature = id,
            AncienStatut = candidature.Statut,
            NouveauStatut = nouveauStatut,
            DateChangement = DateTime.UtcNow,
            Commentaire = "Mis à jour par l'entreprise"
        };
        _context.HistoriquesCandidature.Add(historique);

        // Changer le statut actuel
        candidature.Statut = nouveauStatut;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Statut mis à jour et historisé." });
    }

    // Supprimer une offre (Admin uniquement)
    [HttpDelete("admin/{id}")]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> AdminDeleteOffre(int id)
    {
        var offre = await _context.Offres.FindAsync(id);
        if (offre == null) return NotFound(new { message = "Offre introuvable." });

        _context.Offres.Remove(offre);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Offre supprimée par l'administrateur." });
    }

    // Récupérer toutes les offres (pour l'admin)
    [HttpGet("admin/toutes")]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> GetAllOffres()
    {
        var offres = await _context.Offres
            .Include(o => o.Ville)
            .Include(o => o.Entreprise)
            .Select(o => new
            {
                o.Id,
                o.Titre,
                o.Description,
                o.TypeContrat,
                o.Statut,
                o.DatePublication,
                Ville = o.Ville.Nom,
                Entreprise = o.Entreprise.NomSociete,
                NbCandidatures = _context.Candidatures.Count(c => c.IdOffre == o.Id)
            })
            .OrderByDescending(o => o.DatePublication)
            .ToListAsync();

        return Ok(offres);
    }


    // Créer un entretien pour une candidature (Entreprise uniquement)
    [HttpPost("candidature/{idCandidature}/entretien")]
    public async Task<IActionResult> CreerEntretien(int idCandidature, [FromBody] CreerEntretienDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        // Vérifier que la candidature existe et appartient à une offre de cette entreprise
        var candidature = await _context.Candidatures
            .Include(c => c.Offre)
            .FirstOrDefaultAsync(c => c.Id == idCandidature && c.Offre.IdEntreprise == userId);

        if (candidature == null)
            return NotFound(new { message = "Candidature introuvable ou vous n'avez pas les droits." });

        // Créer l'entretien
        var entretien = new Entretien
        {
            IdCandidature = idCandidature,
            DateHeure = dto.DateHeure,
            Type = dto.Type,
            LienVisio = dto.LienVisio,
            Lieu = dto.Lieu,
            Commentaire = dto.Commentaire
        };

        _context.Entretiens.Add(entretien);
        await _context.SaveChangesAsync();

        // Optionnel : Changer automatiquement le statut de la candidature en "En entretien"
        candidature.Statut = "En entretien";
        await _context.SaveChangesAsync();

        return Ok(new { message = "Entretien programmé avec succès !" });
    }

    [HttpGet("candidat/mes-entretiens")]
    public async Task<IActionResult> GetMesEntretiens()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var entretiens = await _context.Entretiens
            .Include(e => e.Candidature).ThenInclude(c => c.Offre).ThenInclude(o => o.Entreprise)
            .Where(e => e.Candidature.IdCandidat == userId)
            .Select(e => new
            {
                e.Id,
                e.DateHeure,
                e.Type,
                e.LienVisio,
                e.Lieu,
                e.Commentaire,
                Entreprise = e.Candidature.Offre.Entreprise.NomSociete,
                Poste = e.Candidature.Offre.Titre
            })
            .OrderBy(e => e.DateHeure)
            .ToListAsync();

        return Ok(entretiens);
    }

    [HttpGet("entreprise/{idEntreprise}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetOffresByEntreprise(int idEntreprise)
    {
        var offres = await _context.Offres
            .Include(o => o.Ville)
            .Where(o => o.IdEntreprise == idEntreprise && (o.Statut == "Active" || o.Statut == "Publiée"))
            .Select(o => new
            {
                o.Id,
                o.Titre,
                o.TypeContrat,
                Ville = o.Ville.Nom,
                o.DatePublication,
                o.DateLimite
            })
            .OrderByDescending(o => o.DatePublication)
            .ToListAsync();

        return Ok(offres);
    }

    [HttpGet("publique/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetOffreDetailPublique(int id)
    {
        var offre = await _context.Offres
            .Include(o => o.Ville)
            .Include(o => o.Entreprise)
            .Where(o => o.Id == id && (o.Statut == "Active" || o.Statut == "Publiée"))
            .Select(o => new
            {
                o.Id,
                o.Titre,
                o.Description,
                o.TypeContrat,
                o.SalaireMin,
                o.SalaireMax,
                o.DatePublication,
                o.DateLimite,
                Ville = o.Ville.Nom,
                EntrepriseNom = o.Entreprise.NomSociete,
                EntrepriseLogo = o.Entreprise.UrlLogo,
                Secteur = o.Entreprise.SecteurActivite
            })
            .FirstOrDefaultAsync();

        if (offre == null)
            return NotFound(new { message = "Offre introuvable ou expirée." });

        return Ok(offre);
    }

    [HttpGet("recommandations")]
    public async Task<IActionResult> GetRecommandations()
    {
        // 1. Récupérer l'ID de l'utilisateur connecté
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
        {
            return Unauthorized(new { message = "Token invalide ou utilisateur non identifié." });
        }

        // 2. Récupérer le profil DEMANDEUR avec SES compétences (RG10)
        var demandeur = await _context.Utilisateurs
            .OfType<Demandeur>()
            .Include(d => d.DemandeurCompetences) // Charge les compétences liées à ce candidat
            .FirstOrDefaultAsync(d => d.Id == userId);

        if (demandeur == null)
            return NotFound(new { message = "Profil demandeur d'emploi introuvable." });

        // 3. Récupérer les offres actives avec leurs relations (RG12, RG13)
        var offres = await _context.Offres
            .Include(o => o.Ville)
            .Include(o => o.Entreprise)
            .Include(o => o.OffreCompetences).ThenInclude(oc => oc.Competence) // Charge les compétences requises par l'offre
            .Where(o => o.Statut == "Active" || o.Statut == "Publiée")
            .ToListAsync();

        var recommandations = new List<RecommandationDto>();

        foreach (var offre in offres)
        {
            int score = 0;
            var raisons = new List<string>();

            // CRITÈRE 1 : Compétences (40 points max) - RG10 & RG11
            // On compte combien de compétences du candidat correspondent à celles requises par l'offre
            if (demandeur.DemandeurCompetences != null && offre.OffreCompetences != null)
            {
                var idsCompetencesOffre = offre.OffreCompetences.Select(oc => oc.IdCompetence).ToList();
                var competencesMatch = demandeur.DemandeurCompetences.Count(c => idsCompetencesOffre.Contains(c.Id));

                if (competencesMatch > 0)
                {
                    score += Math.Min(40, competencesMatch * 20); // 20 pts par compétence, max 40
                    raisons.Add($"{competencesMatch} compétence(s) en commun");
                }
            }

            // CRITÈRE 2 : Type de contrat (30 points) - RG12
            if (!string.IsNullOrEmpty(offre.TypeContrat) && !string.IsNullOrEmpty(demandeur.TypeContrat))
            {
                if (offre.TypeContrat.Equals(demandeur.TypeContrat, StringComparison.OrdinalIgnoreCase))
                {
                    score += 30;
                    raisons.Add("Type de contrat correspondant");
                }
            }

            // CRITÈRE 3 : Localisation (30 points) - RG12
            // On compare la ville de l'offre avec l'adresse (ou la ville) du demandeur
            string lieuOffre = (offre.Ville?.Nom ?? "") + " " + (offre.Lieu ?? "");
            string lieuDemandeur = demandeur.Adresse ?? "";

            if (!string.IsNullOrEmpty(lieuOffre) && !string.IsNullOrEmpty(lieuDemandeur))
            {
                if (lieuOffre.Contains(lieuDemandeur, StringComparison.OrdinalIgnoreCase) ||
                    lieuDemandeur.Contains(lieuOffre, StringComparison.OrdinalIgnoreCase))
                {
                    score += 30;
                    raisons.Add("Localisation correspondante");
                }
                else if (lieuOffre.Contains("Télétravail", StringComparison.OrdinalIgnoreCase) ||
                         lieuDemandeur.Contains("Télétravail", StringComparison.OrdinalIgnoreCase))
                {
                    score += 15;
                    raisons.Add("Ouvert au télétravail");
                }
            }

            // On ne garde que les offres avec un score >= 40%
            if (score >= 40)
            {
                recommandations.Add(new RecommandationDto
                {
                    IdOffre = offre.Id,
                    Titre = offre.Titre,
                    Entreprise = offre.Entreprise?.NomSociete ?? "Entreprise",
                    Ville = offre.Ville?.Nom ?? offre.Lieu ?? "Non spécifié",
                    TypeContrat = offre.TypeContrat,
                    ScoreMatch = score,
                    Raison = string.Join(", ", raisons) + $" (Match: {score}%)"
                });
            }
        }

        // Trier par score décroissant (les meilleurs matchs en premier)
        var resultatTrié = recommandations
            .OrderByDescending(r => r.ScoreMatch)
            .ToList();

        return Ok(resultatTrié);
    }
}