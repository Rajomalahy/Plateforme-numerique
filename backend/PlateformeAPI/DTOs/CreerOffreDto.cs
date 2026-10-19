using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class CreerOffreDto
{
    [Required] public string Titre { get; set; } = string.Empty;
    [Required] public string Description { get; set; } = string.Empty;
    [Required] public string TypeContrat { get; set; } = string.Empty;
    [Required] public string Ville { get; set; } = string.Empty;
    public decimal? SalaireMin { get; set; }
    public decimal? SalaireMax { get; set; }
    public DateTime? DateLimite { get; set; }
    // Pour simplifier, on envoie les compétences séparées par des virgules
    public string CompetencesRequises { get; set; } = string.Empty; 
}