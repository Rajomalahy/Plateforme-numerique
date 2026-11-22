using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class Candidatures
{
    [Key]
    public int Id { get; set; }

    // Clés étrangères
    public int IdCandidat { get; set; }
    [ForeignKey("IdCandidat")]
    public Demandeur Candidat { get; set; } = null!;

    public int IdOffre { get; set; }
    [ForeignKey("IdOffre")]
    public Offres Offre { get; set; } = null!;

    public DateTime Date { get; set; } = DateTime.UtcNow;

    // RG15 & RG16 : Cycle de vie strict
    [Required]
    [MaxLength(50)]
    public string Statut { get; set; } = "En attente"; // "En attente", "En entretien", "Accepté", "Refusé"

    // Propriétés de navigation
    public ICollection<HistoriqueCandidature> Historiques { get; set; } = new List<HistoriqueCandidature>();
}