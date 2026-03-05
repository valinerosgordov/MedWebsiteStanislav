using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistrationApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEducationAndMemberNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MemberNumber",
                table: "UserProfiles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "EducationEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserProfileId = table.Column<Guid>(type: "TEXT", nullable: false),
                    InstitutionName = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Specialty = table.Column<string>(type: "TEXT", maxLength: 300, nullable: true),
                    GraduationYear = table.Column<int>(type: "INTEGER", nullable: true),
                    DiplomaUrl = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationEntries_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EducationEntries_UserProfileId",
                table: "EducationEntries",
                column: "UserProfileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EducationEntries");

            migrationBuilder.DropColumn(
                name: "MemberNumber",
                table: "UserProfiles");
        }
    }
}
