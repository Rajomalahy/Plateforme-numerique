using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class Entretien
{
    [Key]
    public int Id { get; set; }

    // Clé étrangère vers la candidature
    public int IdCandidature { get; set; }
    [ForeignKey("IdCandidature")]
    public Candidatures Candidature { get; set; } = null!;

    // Informations sur l'entretien
    [Required]
    public DateTime DateHeure { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty; // "Visioconférence" ou "Présentiel"

    [MaxLength(500)]
    public string? LienVisio { get; set; } // Lien Teams/Zoom (si visio)

    [MaxLength(200)]
    public string? Lieu { get; set; } // Adresse (si présentiel)

    [MaxLength(500)]
    public string? Commentaire { get; set; } // Instructions supplémentaires

    public DateTime DateCreation { get; set; } = DateTime.UtcNow;
}