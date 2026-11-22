using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class GoogleLoginDto
{
    [Required]
    public string Token { get; set; } = string.Empty; // Le token envoyé par le frontend React
    
    [Required]
    public string Role { get; set; } = "Demandeur"; // "Demandeur" ou "Entreprise"
}