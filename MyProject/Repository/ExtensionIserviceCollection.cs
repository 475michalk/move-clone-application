using Common.Entity;
using Repository.Entity;
using Repository.Interfaces;
using Repository.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public static class ExtensionIserviceCollection
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
           
            services.AddScoped<IRepository<Drivers>, DriverRepository>();
            services.AddScoped<IRepository<Users>, UserRepository>();
            services.AddScoped<IRepository<Review>, ReviewRepository>();
            services.AddScoped<IRepository<Ordering>, OrderingRepository>();
            services.AddScoped<IRepository<Paypal>, PaypalRepository>();

            return services;
        }
    }

}
