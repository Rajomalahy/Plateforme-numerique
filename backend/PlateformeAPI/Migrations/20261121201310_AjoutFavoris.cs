using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutFavoris : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Competences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nom = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Categorie = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    MotDePasseHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    DateInscription = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Provider = table.Column<string>(type: "text", nullable: true),
                    IdProvider = table.Column<string>(type: "text", nullable: true),
                    EstProfilComplet = table.Column<bool>(type: "boolean", nullable: false),
                    EstBloqué = table.Column<bool>(type: "boolean", nullable: false),
                    Discriminator = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    Admin_Nom = table.Column<string>(type: "text", nullable: true),
                    Matricule = table.Column<string>(type: "text", nullable: true),
                    Nom = table.Column<string>(type: "text", nullable: true),
                    Prenoms = table.Column<string>(type: "text", nullable: true),
                    Telephone = table.Column<string>(type: "text", nullable: true),
                    DateNaissance = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Demandeur_Adresse = table.Column<string>(type: "text", nullable: true),
                    Ville = table.Column<string>(type: "text", nullable: true),
                    Nationalite = table.Column<string>(type: "text", nullable: true),
                    Genre = table.Column<string>(type: "text", nullable: true),
                    TypeContrat = table.Column<string>(type: "text", nullable: true),
                    Disponibilite = table.Column<string>(type: "text", nullable: true),
                    PhotoProfil = table.Column<string>(type: "text", nullable: true),
                    UrlCv = table.Column<string>(type: "text", nullable: true),
                    NiveauEtude = table.Column<string>(type: "text", nullable: true),
                    DureeExperience = table.Column<int>(type: "integer", nullable: true),
                    Reference = table.Column<string>(type: "text", nullable: true),
                    Demandeur_TauxCompletion = table.Column<int>(type: "integer", nullable: true),
                    NomSociete = table.Column<string>(type: "text", nullable: true),
                    SecteurActivite = table.Column<string>(type: "text", nullable: true),
                    TelephoneRH = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    UrlLogo = table.Column<string>(type: "text", nullable: true),
                    NbEmployes = table.Column<string>(type: "text", nullable: true),
                    Adresse = table.Column<string>(type: "text", nullable: true),
                    NumeroFiscal = table.Column<string>(type: "text", nullable: true),
                    NbPostesDisponibles = table.Column<int>(type: "integer", nullable: true),
                    TauxCompletion = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Villes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nom = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Region = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Villes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DemandeurCompetences",
                columns: table => new
                {
                    DemandeurId = table.Column<int>(type: "integer", nullable: false),
                    CompetenceId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DemandeurCompetences", x => new { x.DemandeurId, x.CompetenceId });
                    table.ForeignKey(
                        name: "FK_DemandeurCompetences_Competences_CompetenceId",
                        column: x => x.CompetenceId,
                        principalTable: "Competences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DemandeurCompetences_Utilisateurs_DemandeurId",
                        column: x => x.DemandeurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentsCandidat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCandidat = table.Column<int>(type: "integer", nullable: false),
                    Titre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TypeDocument = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UrlFichier = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DateAjout = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentsCandidat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentsCandidat_Utilisateurs_IdCandidat",
                        column: x => x.IdCandidat,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Offres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdEntreprise = table.Column<int>(type: "integer", nullable: false),
                    IdVille = table.Column<int>(type: "integer", nullable: false),
                    Titre = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    TypeContrat = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SalaireMin = table.Column<decimal>(type: "numeric", nullable: true),
                    SalaireMax = table.Column<decimal>(type: "numeric", nullable: true),
                    Lieu = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DatePublication = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateLimite = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Statut = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Logo = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offres_Utilisateurs_IdEntreprise",
                        column: x => x.IdEntreprise,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Offres_Villes_IdVille",
                        column: x => x.IdVille,
                        principalTable: "Villes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Candidatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCandidat = table.Column<int>(type: "integer", nullable: false),
                    IdOffre = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Statut = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Candidatures_Offres_IdOffre",
                        column: x => x.IdOffre,
                        principalTable: "Offres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Candidatures_Utilisateurs_IdCandidat",
                        column: x => x.IdCandidat,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OffreCompetences",
                columns: table => new
                {
                    IdOffre = table.Column<int>(type: "integer", nullable: false),
                    IdCompetence = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OffreCompetences", x => new { x.IdOffre, x.IdCompetence });
                    table.ForeignKey(
                        name: "FK_OffreCompetences_Competences_IdCompetence",
                        column: x => x.IdCompetence,
                        principalTable: "Competences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OffreCompetences_Offres_IdOffre",
                        column: x => x.IdOffre,
                        principalTable: "Offres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OffresFavoris",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdDemandeur = table.Column<int>(type: "integer", nullable: false),
                    IdOffre = table.Column<int>(type: "integer", nullable: false),
                    DateAjout = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OffresFavoris", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OffresFavoris_Offres_IdOffre",
                        column: x => x.IdOffre,
                        principalTable: "Offres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OffresFavoris_Utilisateurs_IdDemandeur",
                        column: x => x.IdDemandeur,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Entretiens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCandidature = table.Column<int>(type: "integer", nullable: false),
                    DateHeure = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LienVisio = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Lieu = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Commentaire = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DateCreation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entretiens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entretiens_Candidatures_IdCandidature",
                        column: x => x.IdCandidature,
                        principalTable: "Candidatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HistoriquesCandidature",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCandidature = table.Column<int>(type: "integer", nullable: false),
                    AncienStatut = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NouveauStatut = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DateChangement = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Commentaire = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoriquesCandidature", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoriquesCandidature_Candidatures_IdCandidature",
                        column: x => x.IdCandidature,
                        principalTable: "Candidatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Candidatures_IdCandidat_IdOffre",
                table: "Candidatures",
                columns: new[] { "IdCandidat", "IdOffre" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidatures_IdOffre",
                table: "Candidatures",
                column: "IdOffre");

            migrationBuilder.CreateIndex(
                name: "IX_DemandeurCompetences_CompetenceId",
                table: "DemandeurCompetences",
                column: "CompetenceId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsCandidat_IdCandidat",
                table: "DocumentsCandidat",
                column: "IdCandidat");

            migrationBuilder.CreateIndex(
                name: "IX_Entretiens_IdCandidature",
                table: "Entretiens",
                column: "IdCandidature");

            migrationBuilder.CreateIndex(
                name: "IX_HistoriquesCandidature_IdCandidature",
                table: "HistoriquesCandidature",
                column: "IdCandidature");

            migrationBuilder.CreateIndex(
                name: "IX_OffreCompetences_IdCompetence",
                table: "OffreCompetences",
                column: "IdCompetence");

            migrationBuilder.CreateIndex(
                name: "IX_Offres_IdEntreprise",
                table: "Offres",
                column: "IdEntreprise");

            migrationBuilder.CreateIndex(
                name: "IX_Offres_IdVille",
                table: "Offres",
                column: "IdVille");

            migrationBuilder.CreateIndex(
                name: "IX_OffresFavoris_IdDemandeur_IdOffre",
                table: "OffresFavoris",
                columns: new[] { "IdDemandeur", "IdOffre" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OffresFavoris_IdOffre",
                table: "OffresFavoris",
                column: "IdOffre");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateurs_Email",
                table: "Utilisateurs",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DemandeurCompetences");

            migrationBuilder.DropTable(
                name: "DocumentsCandidat");

            migrationBuilder.DropTable(
                name: "Entretiens");

            migrationBuilder.DropTable(
                name: "HistoriquesCandidature");

            migrationBuilder.DropTable(
                name: "OffreCompetences");

            migrationBuilder.DropTable(
                name: "OffresFavoris");

            migrationBuilder.DropTable(
                name: "Candidatures");

            migrationBuilder.DropTable(
                name: "Competences");

            migrationBuilder.DropTable(
                name: "Offres");

            migrationBuilder.DropTable(
                name: "Utilisateurs");

            migrationBuilder.DropTable(
                name: "Villes");
        }
    }
}
