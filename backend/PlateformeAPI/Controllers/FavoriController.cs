using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using PlateformeAPI.Data;
using PlateformeAPI.Models;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Demandeur")]
public class FavoriController : ControllerBase
{
    private readonly AppDbContext _context;

    public FavoriController(AppDbContext context) => _context = context;

    // Liste des numéros d'offres enregistrées par le demandeur connecté
    [HttpGet("mes-ids")]
    public async Task<IActionResult> GetMesIds()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var ids = await _context.OffresFavoris
            .Where(f => f.IdDemandeur == userId)
            .Select(f => f.IdOffre)
            .ToListAsync();

        return Ok(ids);
    }

    // Ajoute aux favoris, ou retire si l'offre y est déjà
    [HttpPost("{idOffre}")]
    public async Task<IActionResult> Basculer(int idOffre)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var existant = await _context.OffresFavoris
            .FirstOrDefaultAsync(f => f.IdDemandeur == userId && f.IdOffre == idOffre);

        if (existant != null)
        {
            _context.OffresFavoris.Remove(existant);
            await _context.SaveChangesAsync();
            return Ok(new { estFavori = false });
        }

        if (!await _context.Offres.AnyAsync(o => o.Id == idOffre))
            return NotFound(new { message = "Offre introuvable." });

        _context.OffresFavoris.Add(new OffreFavori { IdDemandeur = userId, IdOffre = idOffre });
        await _context.SaveChangesAsync();
        return Ok(new { estFavori = true });
    }

    // Liste complète des offres enregistrées par le demandeur connecté
    [HttpGet("mes-favoris")]
    public async Task<IActionResult> GetMesFavoris()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var offres = await _context.OffresFavoris
            .Where(f => f.IdDemandeur == userId)
            .OrderByDescending(f => f.DateAjout)
            .Select(f => new
            {
                f.Offre.Id,
                f.Offre.Titre,
                f.Offre.Description,
                f.Offre.TypeContrat,
                f.Offre.Statut,
                f.Offre.DatePublication,
                Ville = f.Offre.Ville.Nom,
                Entreprise = f.Offre.Entreprise.NomSociete,
                Logo = f.Offre.Logo ?? f.Offre.Entreprise.UrlLogo,
                f.DateAjout
            })
            .ToListAsync();

        return Ok(offres);
    }
}