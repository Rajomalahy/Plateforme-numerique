using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    public UploadController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost("cv")]
    public async Task<IActionResult> UploadCv(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "Aucun fichier sélectionné." });

        // extension
        var allowedExtensions = new[] { ".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        
        if (!allowedExtensions.Contains(extension))
            return BadRequest(new { message = "Format non autorisé. Utilisez PDF, DOC ou DOCX." });

        // taille (Max 5 Mo)
        if (file.Length > 5 * 1024 * 1024)
            return BadRequest(new { message = "Le fichier ne doit pas dépasser 5 Mo." });

        // Générer un nom unique
        var uniqueFileName = $"{Guid.NewGuid()}{extension}";
        
        // Chemin de sauvegarde PLUS ROBUSTE
        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");
        
        // Créer le dossier s'il n'existe pas
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        // Sauvegarder le fichier
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Retourner l'URL
        var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
        
        return Ok(new { 
            message = "Fichier uploadé avec succès.",
            url = fileUrl,
            fileName = file.FileName
        });
    }
}