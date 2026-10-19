using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "L'email est obligatoire.")]
    [EmailAddress(ErrorMessage = "Format d'email invalide. Ex: nom@gmail.com")]
    public string Email { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Le mot de passe est obligatoire.")]
    [MinLength(6, ErrorMessage = "Le mot de passe doit contenir au moins 6 caractères.")]
    public string MotDePasse { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Le rôle est obligatoire.")]
    [RegularExpression(@"^(Demandeur|Entreprise)$", ErrorMessage = "Le rôle doit être 'Demandeur' ou 'Entreprise'.")]
    public string Role { get; set; } = string.Empty;
}