using AutoMapper;
using Common.Entity;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile() { 
        
            CreateMap<DriverDto,Drivers>().ReverseMap();
            CreateMap<UserDto,Users>().ReverseMap();
            CreateMap<OrderingDto,Ordering>().ReverseMap();
            CreateMap<ReviewDto,Review>().ReverseMap();
            CreateMap<PaypalDto, Paypal>().ReverseMap();

        }
    }
}
