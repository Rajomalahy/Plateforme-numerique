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
public class CandidatureController : ControllerBase
{
    private readonly AppDbContext _context;

    public CandidatureController(AppDbContext context) => _context = context;

    // 1. POSTULER à une offre (RG7, RG14, RG15)
    [HttpPost("postuler/{idOffre}")]
    public async Task<IActionResult> Postuler(int idOffre)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        
        var userId = int.Parse(userIdClaim);

        // RG7 : Vérifier que le profil du demandeur est complet
        var candidat = await _context.Utilisateurs.OfType<Demandeur>().FirstOrDefaultAsync(d => d.Id == userId);
        if (candidat == null || !candidat.EstProfilComplet)
        {
            return BadRequest(new { message = "Vous devez compléter votre profil (Nom, Prénom, CV) avant de postuler." });
        }

        // Vérifier que l'offre existe et est active
        var offre = await _context.Offres.FirstOrDefaultAsync(o => o.Id == idOffre && o.Statut == "Active");
        if (offre == null) return NotFound(new { message = "Offre introuvable ou fermée." });

        // RG14 : Vérifier qu'il n'a pas déjà postulé
        var dejaPostule = await _context.Candidatures.AnyAsync(c => c.IdCandidat == userId && c.IdOffre == idOffre);
        if (dejaPostule)
        {
            return BadRequest(new { message = "Vous avez déjà postulé à cette offre." });
        }

        // Créer la candidature
        var nouvelleCandidature = new Candidatures
        {
            IdCandidat = userId,
            IdOffre = idOffre,
            Date = DateTime.UtcNow,
            Statut = "En attente" // RG15 : Statut par défaut
        };

        _context.Candidatures.Add(nouvelleCandidature);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Candidature envoyée avec succès ! Statut : En attente." });
    }

    // 2. VOIR MES CANDIDATURES (Pour le candidat)
    [HttpGet("mes-candidatures")]
    public async Task<IActionResult> GetMesCandidatures()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        
        var userId = int.Parse(userIdClaim);

        var candidatures = await _context.Candidatures
            .Include(c => c.Offre).ThenInclude(o => o.Ville) // Pour avoir le nom de la ville
            .Where(c => c.IdCandidat == userId)
            .Select(c => new {
                c.Id,
                TitreOffre = c.Offre.Titre,
                Entreprise = c.Offre.Entreprise.NomSociete, // Assure-toi que cette propriété existe dans Entreprise
                Ville = c.Offre.Ville.Nom,
                DateCandidature = c.Date,
                c.Statut
            })
            .OrderByDescending(c => c.DateCandidature)
            .ToListAsync();

        return Ok(candidatures);
    }

        // Annuler sa propre candidature (seulement si elle est encore "En attente")
    [HttpDelete("{id}")]
    public async Task<IActionResult> AnnulerCandidature(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        // On cherche la candidature ET on vérifie qu'elle appartient bien à l'utilisateur connecté
        var candidature = await _context.Candidatures.FirstOrDefaultAsync(c => c.Id == id && c.IdCandidat == userId);
        
        if (candidature == null) 
            return NotFound(new { message = "Candidature introuvable ou vous n'avez pas les droits." });

        if (candidature.Statut != "En attente")
            return BadRequest(new { message = "Vous ne pouvez annuler que les candidatures dont le statut est 'En attente'." });

        _context.Candidatures.Remove(candidature);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Candidature annulée avec succès." });
    }
}