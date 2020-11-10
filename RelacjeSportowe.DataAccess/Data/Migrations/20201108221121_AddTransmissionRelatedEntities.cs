using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RelacjeSportowe.DataAccess.Data.Migrations
{
    public partial class AddTransmissionRelatedEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EventDate",
                table: "Transmissions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TeamAway",
                table: "Transmissions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TeamHome",
                table: "Transmissions",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TransmissionEventTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransmissionEventTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TransmissionEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true),
                    TimeInfo = table.Column<string>(nullable: true),
                    TransmissionEventTypeId = table.Column<int>(nullable: false),
                    TransmissionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransmissionEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransmissionEvents_TransmissionEventTypes_TransmissionEventTypeId",
                        column: x => x.TransmissionEventTypeId,
                        principalTable: "TransmissionEventTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransmissionEvents_Transmissions_TransmissionId",
                        column: x => x.TransmissionId,
                        principalTable: "Transmissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransmissionEvents_TransmissionEventTypeId",
                table: "TransmissionEvents",
                column: "TransmissionEventTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TransmissionEvents_TransmissionId",
                table: "TransmissionEvents",
                column: "TransmissionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TransmissionEvents");

            migrationBuilder.DropTable(
                name: "TransmissionEventTypes");

            migrationBuilder.DropColumn(
                name: "EventDate",
                table: "Transmissions");

            migrationBuilder.DropColumn(
                name: "TeamAway",
                table: "Transmissions");

            migrationBuilder.DropColumn(
                name: "TeamHome",
                table: "Transmissions");
        }
    }
}
