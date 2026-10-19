namespace PlateformeAPI.Models;

public class Utilisateur
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string MotDePasseHash { get; set; } = string.Empty; // RG2: On ne stocke JAMAIS le mot de passe en clair
    public Role Role { get; set; }
    public DateTime DateInscription { get; set; } = DateTime.UtcNow;
    
    public string? Provider { get; set; } // "local" ou "google" (RG2)
    public string? IdProvider { get; set; } // ID unique donné par Google
    
    public bool EstProfilComplet { get; set; } = false; // RG6, RG7, RG8
}