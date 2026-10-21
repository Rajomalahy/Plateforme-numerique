using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using PlateformeAPI.Data;
using PlateformeAPI.DTOs;
using PlateformeAPI.Models;
using System.Security.Claims; 

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Administrateur")] 
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    // Créer un nouvel administrateur
    [HttpPost("creer")]
    public async Task<IActionResult> CreerAdmin([FromBody] CreerAdminDto dto)
    {
        // Vérifier si l'email existe déjà
        if (await _context.Utilisateurs.AnyAsync(u => u.Email == dto.Email))
        {
            return BadRequest(new { message = "Cet email est déjà utilisé." });
        }

        // Créer l'objet Admin
        var nouvelAdmin = new Admin
        {
            Email = dto.Email,
            Nom = dto.Nom,
            Matricule = dto.Matricule ?? "MAT-" + DateTime.UtcNow.Ticks.ToString().Substring(0, 6),
            Role = Role.Administrateur,
            DateInscription = DateTime.UtcNow,
            EstProfilComplet = true,
         
            MotDePasseHash = BCrypt.Net.BCrypt.HashPassword(dto.MotDePasse)
        };

        _context.Utilisateurs.Add(nouvelAdmin);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Nouvel administrateur créé avec succès !", email = nouvelAdmin.Email });
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAdmin(int id, [FromBody] UpdateAdminDto dto)
    {
        var admin = await _context.Utilisateurs.OfType<Admin>().FirstOrDefaultAsync(a => a.Id == id);
        if (admin == null) return NotFound(new { message = "Administrateur introuvable." });

        // Vérifier si le nouvel email est déjà pris par quelqu'un d'autre
        if (admin.Email != dto.Email && await _context.Utilisateurs.AnyAsync(u => u.Email == dto.Email))
        {
            return BadRequest(new { message = "Cet email est déjà utilisé par un autre utilisateur." });
        }

        admin.Nom = dto.Nom;
        admin.Email = dto.Email;
        admin.Matricule = dto.Matricule;

        // Si un nouveau mot de passe est fourni, on le hash. Sinon, on garde l'ancien.
        if (!string.IsNullOrEmpty(dto.MotDePasse))
        {
            admin.MotDePasseHash = BCrypt.Net.BCrypt.HashPassword(dto.MotDePasse);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Administrateur mis à jour avec succès !" });
    }

    // 3. SUPPRIMER un administrateur
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAdmin(int id)
    {
        // Récupérer l'ID de l'admin connecté
        var currentUserIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (currentUserIdClaim == null) return Unauthorized();
        
        int currentUserId = int.Parse(currentUserIdClaim);

        //  Empêcher un admin de se supprimer lui-même
        if (id == currentUserId)
        {
            return BadRequest(new { message = "Vous ne pouvez pas supprimer votre propre compte." });
        }

        var admin = await _context.Utilisateurs.OfType<Admin>().FirstOrDefaultAsync(a => a.Id == id);
        if (admin == null) return NotFound(new { message = "Administrateur introuvable." });

        _context.Utilisateurs.Remove(admin);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Administrateur supprimé avec succès !" });
    }
        
        // Récupérer la liste de tous les administrateurs
        [HttpGet("liste")] 
        public async Task<IActionResult> GetAdmins()
        {
            var admins = await _context.Utilisateurs
                .OfType<Admin>()
                .Select(a => new {
                    a.Id,
                    a.Email,
                    a.Nom,
                    a.Matricule,
                    a.DateInscription
                })
                .OrderByDescending(a => a.DateInscription)
                .ToListAsync();
                
            return Ok(admins);
        }
    
    // Récupérer tous les utilisateurs (Entreprises + Demandeurs)
[HttpGet("utilisateurs")]
public async Task<IActionResult> GetUtilisateurs()
{
    // On charge d'abord les données, puis on fait le mapping en mémoire (pour éviter l'erreur CS8122)
    var utilisateurs = await _context.Utilisateurs
        .OrderByDescending(u => u.DateInscription)
        .ToListAsync();

    var result = utilisateurs.Select(u => {
        string nomAffichage = "";
        
        // On récupère le nom selon le type d'utilisateur
        if (u is Entreprise entreprise)
            nomAffichage = entreprise.NomSociete ?? "";
        else if (u is Demandeur demandeur)
            nomAffichage = $"{demandeur.Nom} {demandeur.Prenoms}".Trim();

        return new {
            u.Id,
            u.Email,
            Role = u.Role.ToString(), // Convertit l'enum en string pour le frontend
            u.DateInscription,
            u.EstProfilComplet,
            u.EstBloqué,
            NomAffichage = nomAffichage
        };
    }).ToList();

    return Ok(result);
}

// Bloquer/Débloquer un utilisateur
[HttpPut("utilisateur/{id}/bloquer")]
public async Task<IActionResult> BloquerUtilisateur(int id)
{
    var user = await _context.Utilisateurs.FindAsync(id);
    if (user == null) return NotFound(new { message = "Utilisateur introuvable." });

    // ✅ CORRECTION : On compare avec l'enum Role, pas une string
    if (user.Role == Role.Administrateur)
        return BadRequest(new { message = "Impossible de bloquer un administrateur." });

    user.EstBloqué = !user.EstBloqué;
    await _context.SaveChangesAsync();

    return Ok(new { 
        message = user.EstBloqué ? "Utilisateur bloqué avec succès." : "Utilisateur débloqué avec succès.",
        estBloqué = user.EstBloqué 
    });
}

// Supprimer un utilisateur
[HttpDelete("utilisateur/{id}")]
public async Task<IActionResult> SupprimerUtilisateur(int id)
{
    var user = await _context.Utilisateurs.FindAsync(id);
    if (user == null) return NotFound(new { message = "Utilisateur introuvable." });

    // ✅ CORRECTION : On compare avec l'enum Role
    if (user.Role == Role.Administrateur)
        return BadRequest(new { message = "Impossible de supprimer un administrateur." });

    _context.Utilisateurs.Remove(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Utilisateur supprimé avec succès." });
}

// Voir le profil détaillé d'un utilisateur
[HttpGet("utilisateur/{id}/profil")]
public async Task<IActionResult> GetProfilUtilisateur(int id)
{
    var user = await _context.Utilisateurs.FindAsync(id);
    if (user == null) return NotFound(new { message = "Utilisateur introuvable." });

    if (user is Entreprise entreprise)
    {
        return Ok(new {
            type = "Entreprise",
            entreprise.NomSociete,
            entreprise.SecteurActivite,
            entreprise.Description,
            entreprise.TelephoneRH,
            entreprise.Adresse,
            entreprise.UrlLogo,
            entreprise.NbEmployes,
            //  On utilise une propriété qui existe, ou on la rend optionnelle
            NumeroIdentificationFiscale = entreprise.NumeroFiscal ?? "Non renseigné",
            entreprise.NbPostesDisponibles,
            entreprise.EstProfilComplet,
            entreprise.EstBloqué,
            entreprise.Email,
            entreprise.DateInscription
        });
    }
    else if (user is Demandeur demandeur)
    {
        return Ok(new {
            type = "Demandeur",
            demandeur.Nom,
            demandeur.Prenoms,
            demandeur.Telephone,
            demandeur.DateNaissance,
            demandeur.Adresse,
            demandeur.TypeContrat,
            demandeur.Disponibilite,
            demandeur.PhotoProfil,
            demandeur.UrlCv,
            demandeur.DureeExperience,
            demandeur.NiveauEtude,
            demandeur.TauxCompletion,
            demandeur.EstProfilComplet,
            demandeur.EstBloqué,
            demandeur.Email,
            demandeur.DateInscription
        });
    }

    return BadRequest(new { message = "Type d'utilisateur inconnu." });
}

}