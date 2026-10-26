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

public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPut("profil")]
    [Authorize] 
    public async Task<IActionResult> UpdateProfil([FromBody] UpdateProfilDto dto)
    {

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié." });

        int userId = int.Parse(userIdClaim);

        var demandeur = await _context.Utilisateurs
            .OfType<Demandeur>()
            .FirstOrDefaultAsync(d => d.Id == userId);

        if (demandeur == null) 
            return NotFound(new { message = "Profil demandeur introuvable." });

        demandeur.Nom = dto.Nom;
        demandeur.Prenoms = dto.Prenom;
        demandeur.Telephone = dto.Telephone;
        demandeur.DateNaissance = string.IsNullOrEmpty(dto.DateNaissance) 
            ? null 
            : DateTime.SpecifyKind(DateTime.Parse(dto.DateNaissance), DateTimeKind.Utc);
        demandeur.Adresse = dto.Adresse;
        demandeur.Ville = dto.Ville; 
        demandeur.Nationalite = dto.Nationalite;
        demandeur.Genre = dto.Genre;
        demandeur.TypeContrat = dto.TypeContrat;
        demandeur.Disponibilite = dto.Disponibilite;
        demandeur.NiveauEtude = dto.NiveauEtude;
        if (int.TryParse(dto.DureeExperience, out int experience)) {
            demandeur.DureeExperience = experience;
        } else {
            demandeur.DureeExperience = null;
        }
        demandeur.Reference = dto.Reference;
        demandeur.PhotoProfil = dto.PhotoProfil;
        demandeur.UrlCv = dto.UrlCv;

        if (!string.IsNullOrEmpty(demandeur.Nom) && 
            !string.IsNullOrEmpty(demandeur.Prenoms) && 
            !string.IsNullOrEmpty(demandeur.UrlCv))
        {
            demandeur.EstProfilComplet = true;
            demandeur.TauxCompletion = 100;
        }
        else
        {

            int champsRemplis = 0;
            if (!string.IsNullOrEmpty(demandeur.Nom)) champsRemplis++;
            if (!string.IsNullOrEmpty(demandeur.Prenoms)) champsRemplis++;
            if (!string.IsNullOrEmpty(demandeur.Telephone)) champsRemplis++;
            if (!string.IsNullOrEmpty(demandeur.UrlCv)) champsRemplis++;
            
            demandeur.TauxCompletion = (champsRemplis * 25); 
            demandeur.EstProfilComplet = false;
        }

        await _context.SaveChangesAsync();

        return Ok(new { 
            message = "Profil mis à jour avec succès !",
            estProfilComplet = demandeur.EstProfilComplet
        });
    }

    [HttpGet("profil")]
    [Authorize]
    public async Task<IActionResult> GetProfil()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié." });

        int userId = int.Parse(userIdClaim);

        var demandeur = await _context.Utilisateurs
            .OfType<Demandeur>()
            .FirstOrDefaultAsync(d => d.Id == userId);

        if (demandeur == null) 
            return NotFound(new { message = "Profil demandeur introuvable." });

        return Ok(demandeur);
    }

    [HttpDelete("compte")]
    [Authorize]
    public async Task<IActionResult> DeleteAccount()
    {

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié." });

        int userId = int.Parse(userIdClaim);

        var user = await _context.Utilisateurs.FindAsync(userId);
        if (user == null) 
            return NotFound(new { message = "Utilisateur introuvable." });

        _context.Utilisateurs.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Compte supprimé avec succès." });
    }


    [HttpGet("candidats")]
    [AllowAnonymous] // Tout le monde peut voir la liste des candidats sur l'accueil
    public async Task<IActionResult> GetCandidats()
    {
        // On récupère tous les demandeurs, idéalement ceux qui ont un profil complété
        var candidats = await _context.Utilisateurs
            .OfType<Demandeur>()
            // .Where(d => d.EstProfilComplet == true) 
            .Select(d => new 
            {
                d.Id,
                d.Nom,
                d.Prenoms,
                d.Ville,
                d.NiveauEtude,
                d.PhotoProfil,
                d.TypeContrat,
                d.Disponibilite
            })
            .ToListAsync();

        return Ok(candidats);
    }

    // 1. RÉCUPÉRER LE PROFIL ENTREPRISE
    [HttpGet("profil-entreprise")]
    [Authorize]
    public async Task<IActionResult> GetProfilEntreprise()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié." });

        int userId = int.Parse(userIdClaim);
        var entreprise = await _context.Utilisateurs.OfType<Entreprise>().FirstOrDefaultAsync(e => e.Id == userId);

        if (entreprise == null) return NotFound(new { message = "Profil entreprise introuvable." });
        return Ok(entreprise);
    }

    [HttpPut("profil-entreprise")]
    [Authorize]
    public async Task<IActionResult> UpdateProfilEntreprise([FromBody] UpdateEntrepriseDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié." });

        int userId = int.Parse(userIdClaim);
        var entreprise = await _context.Utilisateurs.OfType<Entreprise>().FirstOrDefaultAsync(e => e.Id == userId);

        if (entreprise == null) return NotFound(new { message = "Profil entreprise introuvable." });

        entreprise.NomSociete = dto.NomSociete;
        entreprise.SecteurActivite = dto.SecteurActivite;
        entreprise.Adresse = dto.Adresse;
        entreprise.Description = dto.Description;
        entreprise.TelephoneRH = dto.TelephoneRH;
        entreprise.UrlLogo = dto.UrlLogo;
        entreprise.NbEmployes = dto.NbEmployes;
        entreprise.NumeroFiscal = dto.NumeroFiscal;

        // Calcul du taux de complétion 
        int champsRemplis = 0;
        if (!string.IsNullOrEmpty(entreprise.NomSociete)) champsRemplis++;
        if (!string.IsNullOrEmpty(entreprise.SecteurActivite)) champsRemplis++;
        if (!string.IsNullOrEmpty(entreprise.Description)) champsRemplis++;
        if (!string.IsNullOrEmpty(entreprise.Adresse)) champsRemplis++;
        if (!string.IsNullOrEmpty(entreprise.UrlLogo)) champsRemplis++;

        entreprise.TauxCompletion = (champsRemplis * 20); 
        entreprise.EstProfilComplet = (champsRemplis >= 3); 

        await _context.SaveChangesAsync();

        return Ok(new { 
            message = "Profil entreprise mis à jour avec succès !",
            estProfilComplet = entreprise.EstProfilComplet
        });
    }

    [HttpGet("entreprises")] 
    [AllowAnonymous] 
    public async Task<IActionResult> GetEntreprises()
    {
        var entreprises = await _context.Utilisateurs
            .OfType<Entreprise>() 
            .Where(e => e.EstProfilComplet == true)  
            .Select(e => new 
            {
                e.Id,
                e.NomSociete,      
                e.SecteurActivite,  
                e.UrlLogo,          
                               
                Ville = e.Adresse ?? "Adresse non précisée" 
            })
            .ToListAsync();

        return Ok(entreprises);
    }

    [HttpGet("entreprise/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetEntrepriseById(int id)
    {
        var entreprise = await _context.Utilisateurs
            .OfType<Entreprise>()
            .Where(e => e.Id == id)
            .Select(e => new 
            {
                e.Id,
                e.NomSociete,
                e.SecteurActivite,
                e.Adresse,
                e.Description,
                e.UrlLogo,
                e.NbEmployes,
                e.TelephoneRH,
                e.NbPostesDisponibles
            })
            .FirstOrDefaultAsync();

        if (entreprise == null)
            return NotFound(new { message = "Entreprise introuvable." });

        return Ok(entreprise);
    }
}


    