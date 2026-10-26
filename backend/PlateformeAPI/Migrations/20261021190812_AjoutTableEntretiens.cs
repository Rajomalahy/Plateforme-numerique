using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutTableEntretiens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_Entretiens_IdCandidature",
                table: "Entretiens",
                column: "IdCandidature");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entretiens");
        }
    }
}
