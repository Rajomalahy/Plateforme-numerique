using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class Offres
{
    [Key]
    public int Id { get; set; }

    // Clés étrangères
    public int IdEntreprise { get; set; }
    [ForeignKey("IdEntreprise")]
    public Entreprise Entreprise { get; set; } = null!;

    public int IdVille { get; set; }
    [ForeignKey("IdVille")]
    public Ville Ville { get; set; } = null!;

    // RG12 & RG13 : Champs obligatoires
    [Required]
    [MaxLength(200)]
    public string Titre { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string TypeContrat { get; set; } = string.Empty; // ex: CDI, CDD, Stage

    // RG12 : Salaire et Lieu
    public decimal? SalaireMin { get; set; }
    public decimal? SalaireMax { get; set; }
    
    [MaxLength(200)]
    public string? Lieu { get; set; } // Détails supplémentaires (ex: "Hybride", "Télétravail partiel")

    // Dates et Statut
    public DateTime DatePublication { get; set; } = DateTime.UtcNow;
    public DateTime? DateLimite { get; set; }

    [Required]
    [MaxLength(50)]
    public string Statut { get; set; } = "Active"; // "Active", "Fermée", "Archivée"

    [MaxLength(500)]
    public string? Logo { get; set; } // Copie du logo de l'entreprise pour l'affichage rapide

    // Propriétés de navigation
    public ICollection<Candidatures> Candidatures { get; set; } = new List<Candidatures>();
    
    // RG11 : Relation Many-to-Many avec les compétences
    public ICollection<OffreCompetence> OffreCompetences { get; set; } = new List<OffreCompetence>();
}