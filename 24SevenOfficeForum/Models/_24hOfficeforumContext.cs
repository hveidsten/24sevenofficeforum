using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using _24SevenOfficeForum.Migrations;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Models
{
    public class _24hOfficeforumContext : DbContext
    {
		


		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
				#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=24hOfficeforum;Trusted_Connection=True;");
            }
        }

	    public virtual DbSet<Answer> Answer { get; set; }
	    public virtual DbSet<Category> Category { get; set; }
	    public virtual DbSet<Question> Question { get; set; }
	    



		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>(entity =>
            {
	            entity.Property(e => e.Id).ValueGeneratedNever();
				
	            entity.Property(e => e.Body).IsUnicode(false);


            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CategoryName).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Body).IsUnicode(false);

                entity.Property(e => e.Header).IsUnicode(false);

                entity.HasOne(d => d.QuestionNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK_Question_Answer");
            });
        }
	    



		public DbSet<_24SevenOfficeForum.Models.Answer> Answer_1 { get; set; }
    }
}
