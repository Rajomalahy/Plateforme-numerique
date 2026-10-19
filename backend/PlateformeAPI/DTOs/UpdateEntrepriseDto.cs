using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class UpdateEntrepriseDto
{
    [Required(ErrorMessage = "Le nom de la société est obligatoire.")]
    public string? NomSociete { get; set; }

    [Required(ErrorMessage = "Le secteur d'activité est obligatoire (RG4).")]
    public string? SecteurActivite { get; set; }

    [Required(ErrorMessage = "L'adresse est obligatoire (RG4).")]
    public string? Adresse { get; set; }

    [Required(ErrorMessage = "La description est obligatoire (RG4, RG8).")]
    public string? Description { get; set; }

    public string? TelephoneRH { get; set; }
    public string? UrlLogo { get; set; }
    public string? NbEmployes { get; set; }
    public string? NumeroFiscal { get; set; }
}