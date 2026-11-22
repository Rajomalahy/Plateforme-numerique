using System;
using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class CreerEntretienDto
{
    [Required]
    public DateTime DateHeure { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? LienVisio { get; set; }

    [MaxLength(200)]
    public string? Lieu { get; set; }

    [MaxLength(500)]
    public string? Commentaire { get; set; }
}