using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class DocumentCandidat
{
    [Key]
    public int Id { get; set; }

    public int IdCandidat { get; set; }
    [ForeignKey("IdCandidat")]
    public Demandeur Candidat { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string Titre { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string TypeDocument { get; set; } = string.Empty; // "cv", "diplome", "attestation", "certificat", "autre"

    [Required]
    [MaxLength(500)]
    public string UrlFichier { get; set; } = string.Empty; // Chemin relatif (ex: /uploads/documents/fichier.pdf)

    public DateTime DateAjout { get; set; } = DateTime.UtcNow;
}