namespace PlateformeAPI.Models;

public class Demandeur : Utilisateur
{
    // RG3 & RG7 : Informations spécifiques
    public string? Nom { get; set; }
    public string? Prenoms { get; set; }
    public string? Telephone { get; set; }
    public DateTime? DateNaissance { get; set; }
    public string? Adresse { get; set; }
    public string? Ville { get; set; }
    public string? Nationalite { get; set; }
    public string? Genre { get; set; }
    public string? TypeContrat { get; set; }
    public string? Disponibilite { get; set; }
    public string? PhotoProfil { get; set; }
    public string? UrlCv { get; set; }
    public string? NiveauEtude { get; set; }
    public int? DureeExperience { get; set; }
    public string? Reference { get; set; }
    public int TauxCompletion { get; set; } = 0;
}