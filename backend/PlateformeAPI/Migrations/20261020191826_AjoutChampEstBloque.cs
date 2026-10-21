using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlateformeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AjoutChampEstBloque : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EstBloqué",
                table: "Utilisateurs",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstBloqué",
                table: "Utilisateurs");
        }
    }
}
