namespace PlateformeAPI.Models;

public class Entreprise : Utilisateur
{
    // RG4 & RG8 : Informations spécifiques
    public string? NomSociete { get; set; }
    public string? SecteurActivite { get; set; }
    public string? TelephoneRH { get; set; }
    public string? Description { get; set; }
    public string? UrlLogo { get; set; }
    public String? NbEmployes { get; set; }
    public string? Adresse { get; set; }
    public string? NumeroFiscal { get; set; }
    public int NbPostesDisponibles { get; set; } = 0;
    public int TauxCompletion { get; set; } = 0;
}