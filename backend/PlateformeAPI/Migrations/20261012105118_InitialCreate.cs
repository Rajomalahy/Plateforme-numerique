using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    Discriminator = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    Admin_Nom = table.Column<string>(type: "text", nullable: true),
                    Matricule = table.Column<string>(type: "text", nullable: true),
                    Nom = table.Column<string>(type: "text", nullable: true),
                    Prenoms = table.Column<string>(type: "text", nullable: true),
                    Telephone = table.Column<string>(type: "text", nullable: true),
                    DateNaissance = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Demandeur_Adresse = table.Column<string>(type: "text", nullable: true),
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
                    NbEmployes = table.Column<int>(type: "integer", nullable: true),
                    Adresse = table.Column<string>(type: "text", nullable: true),
                    NumeroFiscal = table.Column<string>(type: "text", nullable: true),
                    NbPostesDisponibles = table.Column<int>(type: "integer", nullable: true),
                    TauxCompletion = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                });

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
                name: "Utilisateurs");
        }
    }
}
