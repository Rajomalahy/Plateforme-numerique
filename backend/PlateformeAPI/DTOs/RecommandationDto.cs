namespace PlateformeAPI.DTOs;

public class RecommandationDto
{
    public int IdOffre { get; set; }
    public string Titre { get; set; } = string.Empty;
    public string Entreprise { get; set; } = string.Empty;
    public string Ville { get; set; } = string.Empty;
    public string TypeContrat { get; set; } = string.Empty;
    public int ScoreMatch { get; set; }
    public string Raison { get; set; } = string.Empty;
}