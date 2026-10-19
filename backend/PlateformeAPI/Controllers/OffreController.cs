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

    // 1. Obtenir les offres de l'entreprise connectée
    [HttpGet("mes-offres")]
    public async Task<IActionResult> GetMesOffres()
    {
        
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        
        var userId = int.Parse(userIdClaim);
        
        var offres = await _context.Offres
            .Where(o => o.IdEntreprise == userId)
            .Select(o => new {
                o.Id, 
                o.Titre, 
                VilleNom = o.Ville.Nom, //  On projette le NOM de la ville, pas l'objet entier
                o.TypeContrat, 
                o.DatePublication, 
                o.Statut,
                NbCandidatures = _context.Candidatures.Count(c => c.IdOffre == o.Id)
            })
            .OrderByDescending(o => o.DatePublication)
            .ToListAsync();
            
        return Ok(offres);
    }

    // 2. Publier une nouvelle offre 
    [HttpPost("creer")]
    public async Task<IActionResult> CreerOffre([FromBody] CreerOffreDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        
        var userId = int.Parse(userIdClaim);
        
        //Le profil doit être complet
        var entreprise = await _context.Utilisateurs.OfType<Entreprise>().FirstOrDefaultAsync(e => e.Id == userId);
        if (entreprise == null || !entreprise.EstProfilComplet)
            return BadRequest(new { message = "Vous devez compléter votre profil entreprise avant de publier une offre (RG8)." });

        //  Convertir la string "Ville" en objet "Ville"
        var ville = await _context.Villes.FirstOrDefaultAsync(v => v.Nom.ToLower() == dto.Ville.ToLower());
        
        if (ville == null)
        {
            // Si la ville n'existe pas en base, on la crée automatiquement
            ville = new Ville { Nom = dto.Ville, Region = "Non spécifiée" };
            _context.Villes.Add(ville);
            await _context.SaveChangesAsync(); // Nécessaire pour que la ville ait un Id
        }

        
        var nouvelleOffre = new Offres
        {
            IdEntreprise = userId,
            Ville = ville, 
            Titre = dto.Titre,
            Description = dto.Description,
            TypeContrat = dto.TypeContrat,
            SalaireMin = dto.SalaireMin,
            SalaireMax = dto.SalaireMax,
            DateLimite = dto.DateLimite,
            DatePublication = DateTime.UtcNow,
            Statut = "Active",
            Logo = entreprise.UrlLogo 
        };

        _context.Offres.Add(nouvelleOffre);

        // Incrémenter le nombre de postes disponibles
        entreprise.NbPostesDisponibles += 1;
        
        // Un seul SaveChanges à la fin suffit pour tout valider en une transaction
        await _context.SaveChangesAsync();

        return Ok(new { message = "Offre publiée avec succès !" });
    }

    // 3. Obtenir les candidatures pour les offres de l'entreprise
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
            .Select(c => new {
                c.Id,
                NomCandidat = c.Candidat.Prenoms + " " + c.Candidat.Nom,
                TitreOffre = c.Offre.Titre,
                DateCandidature = c.Date,
                c.Statut,
                c.Candidat.UrlCv
            })
            .OrderByDescending(c => c.DateCandidature)
            .ToListAsync();

        return Ok(candidatures);
    }

    // 4. Changer le statut d'une candidature 
    [HttpPut("candidature/{id}/statut")]
    public async Task<IActionResult> UpdateStatutCandidature(int id, [FromBody] string nouveauStatut)
    {
        var candidature = await _context.Candidatures.FindAsync(id);
        if (candidature == null) return NotFound();

        candidature.Statut = nouveauStatut;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Statut mis à jour." });
    }
}