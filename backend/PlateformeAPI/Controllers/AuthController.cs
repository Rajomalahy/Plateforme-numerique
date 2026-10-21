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

namespace PlateformeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration; // Pour lire appsettings.json

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration; // On stocke la config
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

    // LOGIN : Connexion
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        // 1. Chercher l'utilisateur par email
        var utilisateur = await _context.Utilisateurs
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (utilisateur == null)
        {
            return Unauthorized(new { message = "Email ou mot de passe incorrect." });
        }

        // 2. Vérifier le mot de passe
        if (!BCrypt.Net.BCrypt.Verify(dto.MotDePasse, utilisateur.MotDePasseHash))
        {
            return Unauthorized(new { message = "Email ou mot de passe incorrect." });
        }

        // 3. Lire la clé secrète depuis appsettings.json
        var secretKey = _configuration["JwtSettings:SecretKey"];
        var issuer = _configuration["JwtSettings:Issuer"];
        var audience = _configuration["JwtSettings:Audience"];
        var expirationDays = int.Parse(_configuration["JwtSettings:ExpirationInDays"] ?? "7");

        // 4. Créer le token JWT
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, utilisateur.Id.ToString()),
            new Claim(ClaimTypes.Email, utilisateur.Email),
            new Claim(ClaimTypes.Role, utilisateur.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(expirationDays),
            signingCredentials: credentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        // 5. Renvoyer le token et les infos
        return Ok(new LoginResponseDto
        {
            Token = tokenString,
            UserId = utilisateur.Id,
            Email = utilisateur.Email,
            Role = utilisateur.Role.ToString(),
            EstProfilComplet = utilisateur.EstProfilComplet
        });
    }


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
            EstProfilComplet = true
        };

        admin.MotDePasseHash = BCrypt.Net.BCrypt.HashPassword("Admin123!");

        _context.Utilisateurs.Add(admin);
        await _context.SaveChangesAsync();

        return Ok(new { 
            message = "Administrateur créé avec succès !",
            email = admin.Email,
            motDePasse = "Admin123!"
        });
    }

}
