using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class Competence
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nom { get; set; } = string.Empty; // Ex: "React.js", "Gestion de projet", "Anglais"

    [MaxLength(100)]
    public string? Categorie { get; set; } // Ex: "Informatique", "Management", "Langues" (Utile pour les filtres)

    // Propriété de navigation (Relation Many-to-Many avec Offre via OffreCompetence)
    public ICollection<OffreCompetence> OffreCompetences { get; set; } = new List<OffreCompetence>();

    // Optionnel mais recommandé pour la RG10 (Un demandeur peut posséder plusieurs compétences)
    // public ICollection<DemandeurCompetence> DemandeurCompetences { get; set; } = new List<DemandeurCompetence>();
}