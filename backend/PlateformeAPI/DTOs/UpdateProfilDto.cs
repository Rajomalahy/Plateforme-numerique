using System.ComponentModel.DataAnnotations;

namespace PlateformeAPI.DTOs;

public class UpdateProfilDto
{
    [Required(ErrorMessage = "Le nom est obligatoire.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Le nom doit contenir entre 2 et 100 caractères.")]
    public string? Nom { get; set; }

    [Required(ErrorMessage = "Le prénom est obligatoire.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Le prénom doit contenir entre 2 et 100 caractères.")]
    public string? Prenom { get; set; }

    [Required(ErrorMessage = "Le téléphone est obligatoire.")]
    [RegularExpression(@"^\+?[0-9\s-]{8,15}$", ErrorMessage = "Format invalide. Ex: 0348968432, +261348968432, +33612345678")]
    public string? Telephone { get; set; }

    public string? DateNaissance { get; set; }
    
    [StringLength(200, ErrorMessage = "L'adresse est trop longue.")]
    public string? Adresse { get; set; }

    [StringLength(100, ErrorMessage = "Le nom de la ville est trop long.")]
    public string? Ville { get; set; }

    [StringLength(50, ErrorMessage = "La nationalité est trop longue.")]
    public string? Nationalite { get; set; }
    
    [RegularExpression(@"^(Masculin|Feminin|Autre)$", ErrorMessage = "Le genre doit être Masculin, Féminin ou Autre.")]
    public string? Genre { get; set; }

    [StringLength(50)]
    public string? TypeContrat { get; set; }

    [StringLength(50)]
    public string? Disponibilite { get; set; }

    [StringLength(100)]
    public string? NiveauEtude { get; set; }
    
    [RegularExpression(@"^[0-9]+$", ErrorMessage = "La durée doit être un nombre entier.")]
    public string? DureeExperience { get; set; }

    [StringLength(200)]
    public string? Reference { get; set; }

    [Url(ErrorMessage = "L'URL du CV n'est pas valide.")]
    public string? UrlCv { get; set; }

    [Url(ErrorMessage = "L'URL de la photo de profil n'est pas valide.")]
    public string? PhotoProfil { get; set; }
}