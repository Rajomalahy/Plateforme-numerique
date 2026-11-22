using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class OffreFavori
{
    [Key]
    public int Id { get; set; }

    public int IdDemandeur { get; set; }
    [ForeignKey("IdDemandeur")]
    public Demandeur Demandeur { get; set; } = null!;

    public int IdOffre { get; set; }
    [ForeignKey("IdOffre")]
    public Offres Offre { get; set; } = null!;

    public DateTime DateAjout { get; set; } = DateTime.UtcNow;
}