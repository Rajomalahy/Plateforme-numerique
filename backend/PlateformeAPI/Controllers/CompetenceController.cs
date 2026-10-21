using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using PlateformeAPI.Data;
using PlateformeAPI.Models;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompetenceController : ControllerBase
{
    private readonly AppDbContext _context;

    public CompetenceController(AppDbContext context) => _context = context;

    // 1. LISTE (Public - pour les filtres et l'affichage des offres)
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetCompetences()
    {
        var competences = await _context.Competences
            .Select(c => new { c.Id, c.Nom, c.Categorie })
            .OrderBy(c => c.Categorie)
            .ThenBy(c => c.Nom)
            .ToListAsync();
        return Ok(competences);
    }

    // 2. CRÉER (Admin uniquement - RG9)
    [HttpPost]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> CreateCompetence([FromBody] CreateCompetenceDto dto)
    {
        // Vérifier si la compétence existe déjà (nom identique)
        var exists = await _context.Competences.AnyAsync(c => c.Nom.ToLower() == dto.Nom.ToLower());
        if (exists)
            return BadRequest(new { message = "Cette compétence existe déjà dans le référentiel." });

        var competence = new Competence { Nom = dto.Nom, Categorie = dto.Categorie };
        _context.Competences.Add(competence);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Compétence ajoutée avec succès !", id = competence.Id });
    }

    // 3. MODIFIER (Admin uniquement)
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> UpdateCompetence(int id, [FromBody] CreateCompetenceDto dto)
    {
        var competence = await _context.Competences.FindAsync(id);
        if (competence == null) return NotFound(new { message = "Compétence introuvable." });

        // Vérifier si le nouveau nom n'est pas déjà pris par une autre compétence
        var exists = await _context.Competences.AnyAsync(c => c.Id != id && c.Nom.ToLower() == dto.Nom.ToLower());
        if (exists)
            return BadRequest(new { message = "Ce nom de compétence est déjà utilisé." });

        competence.Nom = dto.Nom;
        competence.Categorie = dto.Categorie;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Compétence modifiée avec succès !" });
    }

    // 4. SUPPRIMER (Admin uniquement)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> DeleteCompetence(int id)
    {
        var competence = await _context.Competences.FindAsync(id);
        if (competence == null) return NotFound(new { message = "Compétence introuvable." });
        
        _context.Competences.Remove(competence);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Compétence supprimée avec succès !" });
    }
}

// DTO pour la création/modification
public class CreateCompetenceDto
{
    public string Nom { get; set; } = string.Empty;
    public string? Categorie { get; set; }
}