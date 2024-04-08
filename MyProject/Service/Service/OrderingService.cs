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
        public class OrderingService : IService<OrderingDto>
        {
            private readonly IRepository<Ordering> repository;
            private IMapper mapper;

            public OrderingService(IRepository<Ordering> repository, IMapper mapper)
            {
                this.repository = repository;
                this.mapper = mapper;
            }
           
            public async Task<List<OrderingDto>> getAll()
            {
                return mapper.Map<List<OrderingDto>>(await repository.GetAll());


            }



            public async Task update(int id, OrderingDto entity)
            {
                repository.update(id, mapper.Map<Ordering>(entity));
            }

            public async Task Add(OrderingDto entity)
            {
                await repository.addItem(mapper.Map<Ordering>(entity));
            }

            public async Task delete(int id)
            {
                await repository.delete(id);

            }

            public async Task<OrderingDto> get(int id)
            {
                return mapper.Map<OrderingDto>(await repository.GetById(id));
            }


            public async Task<List<OrderingDto>> GetByDriverId(int driverId)
            {
                var allOrderings = await repository.GetAll();
                return mapper.Map<List<OrderingDto>>(allOrderings.Where(order => order.DriverId == driverId));
            }

        }
    }

