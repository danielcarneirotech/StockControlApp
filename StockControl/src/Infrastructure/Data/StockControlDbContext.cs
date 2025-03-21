using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StockControl.Domain.Entities;

namespace StockControl.Infrastructure.Data
{
    public class StockControlDbContext : DbContext
    {
        public StockControlDbContext(DbContextOptions<StockControlDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasIndex(p => p.Code)
                .IsUnique();
        }
    }
}
