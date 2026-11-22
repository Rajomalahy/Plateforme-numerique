using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class ChangerMotDePasseDto
{
    [Required]
    public string AncienMotDePasse { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string NouveauMotDePasse { get; set; } = string.Empty;
}