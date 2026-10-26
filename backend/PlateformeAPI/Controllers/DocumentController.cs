using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using PlateformeAPI.Data;
using PlateformeAPI.Models;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DocumentController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public DocumentController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // 1. Obtenir tous les documents du candidat connecté
    [HttpGet("mes-documents")]
    public async Task<IActionResult> GetMesDocuments()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var documents = await _context.DocumentsCandidat
            .Where(d => d.IdCandidat == userId)
            .OrderByDescending(d => d.DateAjout)
            .Select(d => new {
                d.Id,
                d.Titre,
                d.TypeDocument,
                d.UrlFichier,
                DateAjout = d.DateAjout.ToString("dd MMM yyyy")
            })
            .ToListAsync();

        return Ok(documents);
    }

    // 2. Uploader un nouveau document
    [HttpPost("upload")]
    public async Task<IActionResult> UploadDocument(IFormFile file, [FromForm] string typeDocument)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        if (file == null || file.Length == 0) return BadRequest(new { message = "Aucun fichier sélectionné." });

        // Limite de taille (5 Mo)
        if (file.Length > 5 * 1024 * 1024) return BadRequest(new { message = "Le fichier ne doit pas dépasser 5 Mo." });

        // Créer le dossier s'il n'existe pas
        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "documents");
        Directory.CreateDirectory(uploadsFolder);

        // Générer un nom de fichier unique pour éviter les conflits
        var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Sauvegarder en base de données
        var nouveauDocument = new DocumentCandidat
        {
            IdCandidat = userId,
            Titre = file.FileName,
            TypeDocument = typeDocument ?? "autre",
            UrlFichier = $"/uploads/documents/{uniqueFileName}"
        };

        _context.DocumentsCandidat.Add(nouveauDocument);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Document uploadé avec succès !" });
    }

    // 3. Supprimer un document
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDocument(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var doc = await _context.DocumentsCandidat.FirstOrDefaultAsync(d => d.Id == id && d.IdCandidat == userId);
        if (doc == null) return NotFound(new { message = "Document introuvable." });

        // Supprimer le fichier physique du serveur
        var filePath = Path.Combine(_env.WebRootPath, doc.UrlFichier.TrimStart('/'));
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        // Supprimer de la base de données
        _context.DocumentsCandidat.Remove(doc);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Document supprimé avec succès." });
    }
}