using AutoMapper;
using Common.Entity;
using Microsoft.Extensions.DependencyInjection;
using Service;
using Service.Interfaces;
using Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddScoped(typeof(IService<DriverDto>), typeof(DriverService));
            services.AddScoped(typeof(IService<UserDto>), typeof(UserService));
            services.AddScoped(typeof(IService<ReviewDto>), typeof(ReviewService));
            services.AddScoped(typeof(IService<OrderingDto>), typeof(OrderingService));
            services.AddScoped(typeof(IService<PaypalDto>), typeof(PaypalService));
            services.AddAutoMapper(typeof(MapperProfile));
            return services;
        }

    }
}
