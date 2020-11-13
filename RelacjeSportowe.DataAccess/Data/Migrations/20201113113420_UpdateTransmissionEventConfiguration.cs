using Microsoft.EntityFrameworkCore.Migrations;

namespace RelacjeSportowe.DataAccess.Data.Migrations
{
    public partial class UpdateTransmissionEventConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents");

            migrationBuilder.CreateIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents",
                column: "TransmissionEventTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents");

            migrationBuilder.CreateIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents",
                column: "TransmissionEventTypeId",
                unique: true);
        }
    }
}
