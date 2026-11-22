using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class DemandeurCompetence
{
    [Key]
    public int Id { get; set; }

    public int DemandeurId { get; set; }
    [ForeignKey("DemandeurId")]
    public Demandeur Demandeur { get; set; } = null!;

    public int CompetenceId { get; set; }
    [ForeignKey("CompetenceId")]
    public Competence Competence { get; set; } = null!;
}