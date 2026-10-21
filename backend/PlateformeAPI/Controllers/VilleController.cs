using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using PlateformeAPI.Data;
using PlateformeAPI.Models;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VilleController : ControllerBase
{
    private readonly AppDbContext _context;

    public VilleController(AppDbContext context) => _context = context;

    // 1. LISTE (Public - pour le dropdown de l'entreprise)
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetVilles()
    {
        var villes = await _context.Villes
            .Select(v => new { v.Id, v.Nom, v.Region })
            .OrderBy(v => v.Nom)
            .ToListAsync();
        return Ok(villes);
    }

    // 2. CRÉER (Admin uniquement)
    [HttpPost]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> CreateVille([FromBody] CreateVilleDto dto)
    {
        // Vérifier si la ville existe déjà
        var exists = await _context.Villes.AnyAsync(v => 
            v.Nom.ToLower() == dto.Nom.ToLower() && 
            (v.Region ?? "").ToLower() == (dto.Region ?? "").ToLower()
        );
        
        if (exists)
            return BadRequest(new { message = "Cette ville existe déjà." });

        var ville = new Ville { Nom = dto.Nom, Region = dto.Region };
        _context.Villes.Add(ville);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Ville ajoutée avec succès !", id = ville.Id });
    }

    // 3. MODIFIER (Admin uniquement)
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> UpdateVille(int id, [FromBody] CreateVilleDto dto)
    {
        var ville = await _context.Villes.FindAsync(id);
        if (ville == null) return NotFound(new { message = "Ville introuvable." });

        var exists = await _context.Villes.AnyAsync(v => 
            v.Id != id && 
            v.Nom.ToLower() == dto.Nom.ToLower() && 
            (v.Region ?? "").ToLower() == (dto.Region ?? "").ToLower()
        );

        if (exists)
            return BadRequest(new { message = "Cette ville existe déjà dans cette région." });

        ville.Nom = dto.Nom;
        ville.Region = dto.Region;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Ville modifiée avec succès !" });
    }

    // 4. SUPPRIMER (Admin uniquement)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrateur")]
    public async Task<IActionResult> DeleteVille(int id)
    {
        var ville = await _context.Villes.FindAsync(id);
        if (ville == null) return NotFound(new { message = "Ville introuvable." });

        // Vérifier si des offres utilisent cette ville
        var offresUtilisant = await _context.Offres.AnyAsync(o => o.IdVille == id);
        if (offresUtilisant)
            return BadRequest(new { message = "Impossible de supprimer : cette ville est utilisée par des offres d'emploi." });

        _context.Villes.Remove(ville);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Ville supprimée avec succès !" });
    }
}

// DTO simple pour créer/modifier
public class CreateVilleDto
{
    public string Nom { get; set; } = string.Empty;
    public string? Region { get; set; }
}