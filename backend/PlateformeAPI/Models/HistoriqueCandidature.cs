using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class HistoriqueCandidature
{
    [Key]
    public int Id { get; set; }

    public int IdCandidature { get; set; }
    [ForeignKey("IdCandidature")]
    public Candidatures Candidature { get; set; } = null!;

    [Required]
    [MaxLength(50)]
    public string AncienStatut { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string NouveauStatut { get; set; } = string.Empty;

    public DateTime DateChangement { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    public string? Commentaire { get; set; } // Ex: "Profil technique validé par le CTO"
}