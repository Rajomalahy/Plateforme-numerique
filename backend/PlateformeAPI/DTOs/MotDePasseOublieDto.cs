using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class MotDePasseOublieDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}

public class ReinitialiserMotDePasseDto
{
    [Required]
    public string Token { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string NouveauMotDePasse { get; set; } = string.Empty;
}