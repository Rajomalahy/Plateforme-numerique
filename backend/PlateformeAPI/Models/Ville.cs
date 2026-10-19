using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.Models;

public class Ville
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nom { get; set; } = string.Empty; 

    [MaxLength(100)]
    public string? Region { get; set; } 

    // ✅ CORRECTION : "Offre" au singulier, pas "Offres"
    public ICollection<Offres> Offres { get; set; } = new List<Offres>();
}