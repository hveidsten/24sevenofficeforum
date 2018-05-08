using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Migrations
{
    public partial class test1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_Answer",
                table: "Question");

            migrationBuilder.DropTable(
                name: "FullViewModels");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "Question",
                newName: "SearchViewModelsId");

            migrationBuilder.RenameIndex(
                name: "IX_Question_QuestionId",
                table: "Question",
                newName: "IX_Question_SearchViewModelsId");

            migrationBuilder.AlterColumn<string>(
                name: "Header",
                table: "Question",
                unicode: false,
                nullable: false,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Question",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Question",
                unicode: false,
                nullable: false,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AnswerId",
                table: "Question",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Category",
                unicode: false,
                nullable: false,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CategoryName",
                table: "Category",
                unicode: false,
                nullable: false,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Answer",
                unicode: false,
                nullable: false,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "Answer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SearchViewModelsId",
                table: "Answer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SearchViewModel",
                columns: table => new
                {
                    sId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchViewModel", x => x.sId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Question_CategoryId",
                table: "Question",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionId",
                table: "Answer",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_SearchViewModelsId",
                table: "Answer",
                column: "SearchViewModelsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Question",
                table: "Answer",
                column: "QuestionId",
                principalTable: "Question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_SearchViewModel_SearchViewModelsId",
                table: "Answer",
                column: "SearchViewModelsId",
                principalTable: "SearchViewModel",
                principalColumn: "sId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_Category",
                table: "Question",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_SearchViewModel_SearchViewModelsId",
                table: "Question",
                column: "SearchViewModelsId",
                principalTable: "SearchViewModel",
                principalColumn: "sId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Question",
                table: "Answer");

            migrationBuilder.DropForeignKey(
                name: "FK_Answer_SearchViewModel_SearchViewModelsId",
                table: "Answer");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_Category",
                table: "Question");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_SearchViewModel_SearchViewModelsId",
                table: "Question");

            migrationBuilder.DropTable(
                name: "SearchViewModel");

            migrationBuilder.DropIndex(
                name: "IX_Question_CategoryId",
                table: "Question");

            migrationBuilder.DropIndex(
                name: "IX_Answer_QuestionId",
                table: "Answer");

            migrationBuilder.DropIndex(
                name: "IX_Answer_SearchViewModelsId",
                table: "Answer");

            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "Answer");

            migrationBuilder.DropColumn(
                name: "SearchViewModelsId",
                table: "Answer");

            migrationBuilder.RenameColumn(
                name: "SearchViewModelsId",
                table: "Question",
                newName: "QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Question_SearchViewModelsId",
                table: "Question",
                newName: "IX_Question_QuestionId");

            migrationBuilder.AlterColumn<string>(
                name: "Header",
                table: "Question",
                unicode: false,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Question",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Question",
                unicode: false,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Category",
                unicode: false,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false);

            migrationBuilder.AlterColumn<string>(
                name: "CategoryName",
                table: "Category",
                unicode: false,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false);

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Answer",
                unicode: false,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false);

            migrationBuilder.CreateTable(
                name: "FullViewModels",
                columns: table => new
                {
                    Identifier = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FullViewModels", x => x.Identifier);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Question_Answer",
                table: "Question",
                column: "QuestionId",
                principalTable: "Answer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
