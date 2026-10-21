using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class CreerOffreDto
{
    [Required] public string Titre { get; set; } = string.Empty;
    [Required] public string Description { get; set; } = string.Empty;
    [Required] public string TypeContrat { get; set; } = string.Empty;
    
    // On envoie l'ID de la ville (car c'est un entier en base de données)
    [Required] public int VilleId { get; set; } 
    
    public decimal? SalaireMin { get; set; }
    public decimal? SalaireMax { get; set; }
    public DateTime? DateLimite { get; set; }

    public List<int> CompetenceIds { get; set; } = new List<int>();
}