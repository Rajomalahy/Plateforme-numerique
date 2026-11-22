using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class OffreCompetence
{
    public int IdOffre { get; set; }
    [ForeignKey("IdOffre")]
    public Offres Offre { get; set; } = null!;

    public int IdCompetence { get; set; }
    [ForeignKey("IdCompetence")]
    public Competence Competence { get; set; } = null!;
}