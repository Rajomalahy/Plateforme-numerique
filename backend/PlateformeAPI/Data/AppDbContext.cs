using Microsoft.EntityFrameworkCore;
using PlateformeAPI.Models;

namespace PlateformeAPI.Data;

public class AppDbContext : DbContext
{
    // Le constructeur est obligatoire pour que .NET injecte la configuration
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // On déclare la table de base. EF Core est intelligent : il va créer 
    // une seule table "Utilisateurs" avec une colonne cachée "Discriminator" 
    // qui sait si la ligne est un Demandeur, une Entreprise ou un Admin.
    public DbSet<Utilisateur> Utilisateurs { get; set; }
    public DbSet<Ville> Villes { get; set; }
    public DbSet<Competence> Competences { get; set; }
    public DbSet<Offres> Offres { get; set; }
    public DbSet<Candidatures> Candidatures { get; set; }
    public DbSet<HistoriqueCandidature> HistoriquesCandidature { get; set; }
    public DbSet<OffreCompetence> OffreCompetences { get; set; }
    public DbSet<Entretien> Entretiens { get; set; }
    public DbSet<DocumentCandidat> DocumentsCandidat { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // L'email doit être unique dans toute la table
        modelBuilder.Entity<Utilisateur>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Configuration de l'héritage (Table Per Hierarchy)
        modelBuilder.Entity<Demandeur>().ToTable("Utilisateurs");
        modelBuilder.Entity<Entreprise>().ToTable("Utilisateurs");
        modelBuilder.Entity<Admin>().ToTable("Utilisateurs");

         //  Définir la clé composite pour la table de liaison (Règle la cause de ton erreur)
        modelBuilder.Entity<OffreCompetence>()
            .HasKey(oc => new { oc.IdOffre, oc.IdCompetence });

        //  RG14 - Un candidat ne peut postuler qu'une seule fois à la même offre
        modelBuilder.Entity<Candidatures>()
            .HasIndex(c => new { c.IdCandidat, c.IdOffre })
            .IsUnique();
        
    }
}