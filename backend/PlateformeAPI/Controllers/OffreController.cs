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

    // 2. Publier une nouvelle offre (RG8, RG11, RG12, RG13)
    [HttpPost("creer")]
    public async Task<IActionResult> CreerOffre([FromBody] CreerOffreDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized(new { message = "Non authentifié" });
        
        var userId = int.Parse(userIdClaim);
        
        // Vérification RG8
        var entreprise = await _context.Utilisateurs.OfType<Entreprise>().FirstOrDefaultAsync(e => e.Id == userId);
        if (entreprise == null || !entreprise.EstProfilComplet)
            return BadRequest(new { message = "Vous devez compléter votre profil entreprise avant de publier une offre." });

        // Vérifier que la ville existe
        var ville = await _context.Villes.FindAsync(dto.VilleId);
        if (ville == null) return BadRequest(new { message = "Ville invalide." });

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
            DatePublication = DateTime.UtcNow,
            Statut = "Active",
            Logo = entreprise.UrlLogo
        };

        _context.Offres.Add(nouvelleOffre);
        await _context.SaveChangesAsync(); // OBLIGATOIRE : On sauvegarde d'abord pour générer l'Id de l'offre

        // 2. Lier les compétences (RG11 & RG13)
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
        
        await _context.SaveChangesAsync(); // On sauvegarde les liens

        entreprise.NbPostesDisponibles += 1;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Offre publiée avec succès !", idOffre = nouvelleOffre.Id });
    }

    // 3. MODIFIER une offre
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOffre(int id, [FromBody] CreerOffreDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim);

        var offre = await _context.Offres.FirstOrDefaultAsync(o => o.Id == id && o.IdEntreprise == userId);
        if (offre == null) return NotFound(new { message = "Offre introuvable ou vous n'avez pas les droits." });

        offre.Titre = dto.Titre;
        offre.Description = dto.Description;
        offre.TypeContrat = dto.TypeContrat;
        offre.IdVille = dto.VilleId;
        offre.SalaireMin = dto.SalaireMin;
        offre.SalaireMax = dto.SalaireMax;
        offre.DateLimite = dto.DateLimite;

        // Mise à jour des compétences : on supprime les anciennes et on met les nouvelles
        var anciennesCompetences = await _context.OffreCompetences.Where(oc => oc.IdOffre == id).ToListAsync();
        _context.OffreCompetences.RemoveRange(anciennesCompetences);

        foreach (var compId in dto.CompetenceIds)
        {
            if (await _context.Competences.AnyAsync(c => c.Id == compId))
            {
                _context.OffreCompetences.Add(new OffreCompetence { IdOffre = id, IdCompetence = compId });
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Offre modifiée avec succès !" });
    }

    // 4. SUPPRIMER une offre
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

        return Ok(new {
            offre.Id,
            offre.Titre,
            offre.Description,
            offre.TypeContrat,
            VilleId = offre.IdVille,
            offre.SalaireMin,
            offre.SalaireMax,
            DateLimite = offre.DateLimite?.ToString("yyyy-MM-dd"),
            CompetenceIds = offre.OffreCompetences.Select(oc => oc.IdCompetence).ToList()
        });
    }

    // Obtenir toutes les offres actives (Pour les candidats)
    [HttpGet("offres-publiques")]
    [AllowAnonymous]
    public async Task<IActionResult> GetOffresPubliques()
    {
        var offres = await _context.Offres
            .Include(o => o.Ville)
            .Include(o => o.Entreprise)
            .Where(o => o.Statut == "Active")
            .Select(o => new {
                o.Id,
                o.Titre,
                o.Description,
                o.TypeContrat,
                Ville = o.Ville.Nom,
                Entreprise = o.Entreprise.NomSociete, 
                Logo = o.Logo,
                DatePublication = o.DatePublication,
                SalaireMin = o.SalaireMin,
                SalaireMax = o.SalaireMax
            })
            .OrderByDescending(o => o.DatePublication)
            .ToListAsync();

        return Ok(offres);
    }

        // 5. Obtenir les candidatures pour les offres de l'entreprise (Version Sécurisée)
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
        .Select(o => new {
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
            .Select(e => new {
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
            .Select(o => new {
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
            .Select(o => new {
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
}