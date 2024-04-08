using AutoMapper;
using Common.Entity;
using Repository.Entity;
using Repository.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service
{
    public class DriverService:IService<DriverDto>
    {
        private readonly IRepository<Drivers> repository;
        private IMapper mapper;

        public DriverService(IRepository<Drivers> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }


        public async Task Add(DriverDto entity)
        {
            await repository.addItem(mapper.Map<Drivers>(entity));
        }

        public async Task delete(int id)
        {
            await repository.delete(id);
        }

        public async Task<DriverDto> get(int id)
        {
            return mapper.Map<DriverDto>(await repository.GetById(id));
        }

        public async Task<List<DriverDto>> getAll()
        {
            return mapper.Map<List<DriverDto>>(await repository.GetAll());
        }

        


        public async Task update(int id, DriverDto entity)
        {
            await repository.update(id, mapper.Map<Drivers>(entity));
        }
        public async Task<List<DriverDto>> GetByDriverId(int driverId)
        {
            var allDrivers = await repository.GetAll();
            return mapper.Map<List<DriverDto>>(allDrivers.Where(driver => driver.Id == driverId));
        }

    }
}
