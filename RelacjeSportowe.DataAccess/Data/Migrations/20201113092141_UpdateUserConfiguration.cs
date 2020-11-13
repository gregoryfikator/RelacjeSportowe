using Microsoft.EntityFrameworkCore.Migrations;

namespace RelacjeSportowe.DataAccess.Data.Migrations
{
    public partial class UpdateUserConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "TransmissionEventTypes",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents",
                column: "TransmissionEventTypeId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "TransmissionEventTypes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents",
                column: "TransmissionEventTypeId");
        }
    }
}
