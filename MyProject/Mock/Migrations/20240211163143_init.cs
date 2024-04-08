using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataContext.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "paypals",
                columns: table => new
                {
                    PaypalId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    NumberCard = table.Column<int>(type: "int", nullable: false),
                    Validity = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Cvc = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    IdentityCard = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paypals", x => x.PaypalId);
                });

            migrationBuilder.CreateTable(
                name: "drivers",
                columns: table => new
                {
                    IdDriver = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChoiseCar = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderingOrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_drivers", x => x.IdDriver);
                });

            migrationBuilder.CreateTable(
                name: "reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderingOrderId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reviews", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "orderings",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DriverId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChoiseCar = table.Column<int>(type: "int", nullable: false),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriveTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaypalId = table.Column<int>(type: "int", nullable: false),
                    ReviewId = table.Column<int>(type: "int", nullable: false),
                    DriversIdDriver = table.Column<int>(type: "int", nullable: true),
                    UsersUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderings", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_orderings_drivers_DriversIdDriver",
                        column: x => x.DriversIdDriver,
                        principalTable: "drivers",
                        principalColumn: "IdDriver");
                    table.ForeignKey(
                        name: "FK_orderings_paypals_PaypalId",
                        column: x => x.PaypalId,
                        principalTable: "paypals",
                        principalColumn: "PaypalId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_orderings_reviews_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "reviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReviewId = table.Column<int>(type: "int", nullable: false),
                    OrderingOrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_users_orderings_OrderingOrderId",
                        column: x => x.OrderingOrderId,
                        principalTable: "orderings",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_users_reviews_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "reviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_drivers_OrderingOrderId",
                table: "drivers",
                column: "OrderingOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_orderings_DriversIdDriver",
                table: "orderings",
                column: "DriversIdDriver");

            migrationBuilder.CreateIndex(
                name: "IX_orderings_PaypalId",
                table: "orderings",
                column: "PaypalId");

            migrationBuilder.CreateIndex(
                name: "IX_orderings_ReviewId",
                table: "orderings",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_orderings_UsersUserId",
                table: "orderings",
                column: "UsersUserId");

            migrationBuilder.CreateIndex(
                name: "IX_reviews_OrderingOrderId",
                table: "reviews",
                column: "OrderingOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_users_OrderingOrderId",
                table: "users",
                column: "OrderingOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_users_ReviewId",
                table: "users",
                column: "ReviewId");

            migrationBuilder.AddForeignKey(
                name: "FK_drivers_orderings_OrderingOrderId",
                table: "drivers",
                column: "OrderingOrderId",
                principalTable: "orderings",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_orderings_OrderingOrderId",
                table: "reviews",
                column: "OrderingOrderId",
                principalTable: "orderings",
                principalColumn: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_orderings_users_UsersUserId",
                table: "orderings",
                column: "UsersUserId",
                principalTable: "users",
                principalColumn: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orderings_drivers_DriversIdDriver",
                table: "orderings");

            migrationBuilder.DropForeignKey(
                name: "FK_orderings_paypals_PaypalId",
                table: "orderings");

            migrationBuilder.DropForeignKey(
                name: "FK_orderings_users_UsersUserId",
                table: "orderings");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_orderings_OrderingOrderId",
                table: "reviews");

            migrationBuilder.DropTable(
                name: "drivers");

            migrationBuilder.DropTable(
                name: "paypals");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "orderings");

            migrationBuilder.DropTable(
                name: "reviews");
        }
    }
}
