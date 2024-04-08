using Common.Entity;
using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<Drivers> drivers { get; set; }
        public DbSet<Users> users { get; set; }
        public DbSet<Ordering> orderings { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<Paypal> paypals { get; set; }
        public Task save();
    }
}
