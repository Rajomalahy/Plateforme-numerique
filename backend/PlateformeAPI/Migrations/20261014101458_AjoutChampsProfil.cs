using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutChampsProfil : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Genre",
                table: "Utilisateurs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nationalite",
                table: "Utilisateurs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ville",
                table: "Utilisateurs",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Genre",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "Nationalite",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "Ville",
                table: "Utilisateurs");
        }
    }
}
