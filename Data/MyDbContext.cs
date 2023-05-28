using System;
using Delivery_App.Model;
using Microsoft.EntityFrameworkCore;

namespace Delivery_App.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Restaurant> Restaurants { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurant>()
                .HasMany(r => r.Items)
                .WithOne(i => i.Restaurant)
                .HasForeignKey(i => i.RestaurantId);

            modelBuilder.Entity<Order>()
    .HasMany(o => o.OrderItems)
    .WithOne(oi => oi.Order)
    .HasForeignKey(oi => oi.OrderId);



            modelBuilder.Entity<Order>()
                .HasIndex(o => o.UniqueCode)
                .IsUnique();
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.MenuItem)
                .WithMany() // Many OrderItems can have one MenuItem
                .HasForeignKey(oi => oi.MenuItemId);

            base.OnModelCreating(modelBuilder);
        }

    }
}