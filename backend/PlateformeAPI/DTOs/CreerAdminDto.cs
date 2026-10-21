using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class CreerAdminDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6, ErrorMessage = "Le mot de passe doit faire au moins 6 caractères.")]
    public string MotDePasse { get; set; } = string.Empty;

    [Required]
    public string Nom { get; set; } = string.Empty;

    public string? Matricule { get; set; }
}

public class UpdateAdminDto
{
    public string Nom { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Matricule { get; set; }
    public string? MotDePasse { get; set; } // Optionnel : si vide, le mot de passe ne change pas
}