namespace PlateformeAPI.Models;

public class Utilisateur
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string MotDePasseHash { get; set; } = string.Empty; //  On ne stocke JAMAIS le mot de passe en clair
    public Role Role { get; set; }
    public DateTime DateInscription { get; set; } = DateTime.UtcNow;
    
    public string? Provider { get; set; } // "local" ou "google" 
    public string? IdProvider { get; set; } // ID unique donné par Google
    
    public bool EstProfilComplet { get; set; } = false; 

    public bool EstBloqué { get; set; } = false;
}