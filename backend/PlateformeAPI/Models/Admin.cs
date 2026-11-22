namespace PlateformeAPI.Models;

public class Admin : Utilisateur
{
    // RG5 : Créé de manière sécurisée
    public string? Nom { get; set; }
    public string? Matricule { get; set; }
}