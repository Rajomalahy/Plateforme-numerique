using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PlateformeAPI.Data;
using PlateformeAPI.DTOs;
using PlateformeAPI.Models;
using BCrypt.Net;
using Google.Apis.Auth;

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // REGISTER : Inscription
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _context.Utilisateurs.AnyAsync(u => u.Email == dto.Email))
        {
            return BadRequest(new { message = "Cet email est déjà utilisé." });
        }

        if (!Enum.TryParse<Role>(dto.Role, true, out var role))
        {
            return BadRequest(new { message = "Rôle invalide." });
        }

        Utilisateur nouvelUtilisateur = role switch
        {
            Role.Demandeur => new Demandeur { Role = role },
            Role.Entreprise => new Entreprise { Role = role },
            Role.Administrateur => new Admin { Role = role },
            _ => throw new ArgumentException("Rôle inconnu")
        };

        nouvelUtilisateur.Email = dto.Email;
        nouvelUtilisateur.MotDePasseHash = BCrypt.Net.BCrypt.HashPassword(dto.MotDePasse);
        nouvelUtilisateur.Provider = "local";
        nouvelUtilisateur.EstProfilComplet = false;

        _context.Utilisateurs.Add(nouvelUtilisateur);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Inscription réussie !", userId = nouvelUtilisateur.Id });
    }

    // LOGIN : Connexion classique
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var utilisateur = await _context.Utilisateurs.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (utilisateur == null || !BCrypt.Net.BCrypt.Verify(dto.MotDePasse, utilisateur.MotDePasseHash))
        {
            return Unauthorized(new { message = "Email ou mot de passe incorrect." });
        }

        // Appel de la méthode privée pour générer le token
        var tokenString = GenerateJwtToken(utilisateur);

        return Ok(new LoginResponseDto
        {
            Token = tokenString,
            UserId = utilisateur.Id,
            Email = utilisateur.Email,
            Role = utilisateur.Role.ToString(),
            EstProfilComplet = utilisateur.EstProfilComplet
        });
    }

    // SEED ADMIN : Création d'un admin de test
    [HttpPost("seed-admin")]
    [AllowAnonymous]
    public async Task<IActionResult> SeedAdmin()
    {
        var adminExists = await _context.Utilisateurs.AnyAsync(u => u.Role == Role.Administrateur);
        if (adminExists)
            return BadRequest(new { message = "Un administrateur existe déjà." });

        var admin = new Admin
        {
            Email = "admin@ministere.mg",
            Nom = "Administrateur Système",
            Matricule = "MAT001",
            Role = Role.Administrateur, 
            DateInscription = DateTime.UtcNow,
            EstProfilComplet = true,
            MotDePasseHash = BCrypt.Net.BCrypt.HashPassword("Admin123!")
        };

        _context.Utilisateurs.Add(admin);
        await _context.SaveChangesAsync();

        return Ok(new { 
            message = "Administrateur créé avec succès !",
            email = admin.Email,
            motDePasse = "Admin123!"
        });
    }

    // GOOGLE LOGIN : Connexion via Google (RG2)
    [HttpPost("google-login")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
    {
        try
        {
            // 1. Valider le token avec les serveurs de Google
            var payload = await GoogleJsonWebSignature.ValidateAsync(dto.Token);

            // 2. Vérifier si l'utilisateur existe déjà
            var user = await _context.Utilisateurs.FirstOrDefaultAsync(u => u.Email == payload.Email);

            if (user == null)
            {
                // 3. Création du compte s'il n'existe pas
                var randomPassword = Guid.NewGuid().ToString("N");
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(randomPassword); 

                if (dto.Role == "Entreprise")
                {
                    var newEntreprise = new Entreprise
                    {
                        Email = payload.Email,
                        MotDePasseHash = passwordHash, // ✅ CORRECTION : MotDePasseHash au lieu de MotDePasse
                        Role = Role.Entreprise,
                        NomSociete = payload.Name ?? "Entreprise Google", 
                        DateInscription = DateTime.UtcNow,
                        EstProfilComplet = false,
                        Provider = "google", // ✅ Bonne pratique pour savoir d'où vient le compte
                        IdProvider = payload.Subject
                    };
                    _context.Utilisateurs.Add(newEntreprise);
                    user = newEntreprise;
                }
                else
                {
                    var newDemandeur = new Demandeur
                    {
                        Email = payload.Email,
                        MotDePasseHash = passwordHash, // ✅ CORRECTION : MotDePasseHash au lieu de MotDePasse
                        Role = Role.Demandeur,
                        Prenoms = payload.GivenName ?? "Prénom",
                        Nom = payload.FamilyName ?? "Nom",
                        DateInscription = DateTime.UtcNow,
                        EstProfilComplet = false,
                        Provider = "google",
                        IdProvider = payload.Subject
                    };
                    _context.Utilisateurs.Add(newDemandeur);
                    user = newDemandeur;
                }
                await _context.SaveChangesAsync();
            }
            else
            {
                // Sécurité : Vérifier que le rôle correspond
                if (user.Role.ToString() != dto.Role)
                {
                    return BadRequest(new { message = $"Cet email est déjà associé à un compte {user.Role}." });
                }
            }

            // 4. Générer le JWT via la méthode privée
            var tokenString = GenerateJwtToken(user); 

            return Ok(new 
            { 
                message = "Connexion réussie via Google",
                token = tokenString,
                userId = user.Id,
                email = user.Email,
                role = user.Role.ToString(),
                estProfilComplet = user.EstProfilComplet
            });
        }
        catch (InvalidJwtException)
        {
            return BadRequest(new { message = "Le token Google est invalide ou expiré." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erreur interne lors de l'authentification Google.", detail = ex.Message });
        }
    }

    // ✅ MÉTHODE PRIVÉE POUR GÉNÉRER LE JWT (Évite la répétition de code)
    private string GenerateJwtToken(Utilisateur user)
    {
        var secretKey = _configuration["JwtSettings:SecretKey"];
        var issuer = _configuration["JwtSettings:Issuer"];
        var audience = _configuration["JwtSettings:Audience"];
        var expirationDays = int.Parse(_configuration["JwtSettings:ExpirationInDays"] ?? "7");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(expirationDays),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}