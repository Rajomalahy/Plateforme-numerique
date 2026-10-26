using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutTableDocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsCandidat_IdCandidat",
                table: "DocumentsCandidat",
                column: "IdCandidat");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentsCandidat");
        }
    }
}
