using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class Competence
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nom { get; set; } = string.Empty; 

    [MaxLength(100)]
    public string? Categorie { get; set; } 

    // Propriété de navigation (Relation Many-to-Many avec Offre via OffreCompetence)
    public ICollection<OffreCompetence> OffreCompetences { get; set; } = new List<OffreCompetence>();

    public ICollection<DemandeurCompetence> DemandeurCompetences { get; set; } = new List<DemandeurCompetence>();
}