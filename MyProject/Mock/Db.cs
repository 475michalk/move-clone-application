using Repository.Entity;
using Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataContext
{
    public class Db : DbContext, IContext
    {
        public DbSet<Drivers> drivers { get ; set; }
        public DbSet<Users> users { get ; set ; }
        public DbSet<Ordering> orderings { get ; set ; }
        public DbSet<Review> reviews { get ; set; }
        public DbSet<Paypal> paypals { get ; set ; }

        public async Task save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           
            optionsBuilder.UseSqlServer("Server=LAPTOP-72POQIG8\\SQLEXPRESS;Database=Driver3;Trusted_Connection=True;");

        }
    }
}