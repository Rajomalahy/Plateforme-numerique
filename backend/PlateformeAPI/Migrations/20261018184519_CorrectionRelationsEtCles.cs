using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class CorrectionRelationsEtCles : Migration
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoriquesCandidature");

            migrationBuilder.DropTable(
                name: "OffreCompetences");

            migrationBuilder.DropTable(
                name: "Candidatures");

            migrationBuilder.DropTable(
                name: "Competences");

            migrationBuilder.DropTable(
                name: "Offres");

            migrationBuilder.DropTable(
                name: "Villes");
        }
    }
}
