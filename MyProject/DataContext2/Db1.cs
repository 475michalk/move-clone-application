using Common.Entity;
using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interfaces;

namespace DataContext2
{
    public class Db1:DbContext, IContext
    {
       
        public DbSet<Drivers> drivers { get ; set ; }
        public DbSet<Users> users { get; set ; }
        public DbSet<Review> reviews { get; set ; }
        public DbSet<Paypal> paypals { get; set ; }
        public DbSet<Ordering> orderings { get ; set; }

        public async Task save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=moveProjectDB;Trusted_Connection=True;");

        }
    }
}