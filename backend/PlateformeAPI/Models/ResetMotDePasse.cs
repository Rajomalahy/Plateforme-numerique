using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlateformeAPI.Models;

public class ResetMotDePasse
{
    [Key]
    public int Id { get; set; }

    public int IdUtilisateur { get; set; }
    [ForeignKey("IdUtilisateur")]
    public Utilisateur Utilisateur { get; set; } = null!;

    public string TokenHash { get; set; } = string.Empty;
    public DateTime Expiration { get; set; }
    public bool Utilise { get; set; } = false;
}