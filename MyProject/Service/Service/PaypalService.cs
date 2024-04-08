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
    public class PaypalService : IService<PaypalDto>
    {
        private readonly IRepository<Paypal> repository;
        private IMapper mapper;

        public PaypalService(IRepository<Paypal> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task Add(PaypalDto entity)
        {
            await repository.addItem(mapper.Map<Paypal>(entity));

        }

        public async Task delete(int id)
        {
            await repository.delete(id);

        }

        public async Task<PaypalDto> get(int id)
        {
            return mapper.Map<PaypalDto>(await repository.GetById(id));

        }

        public async Task<List<PaypalDto>> getAll()
        {
            return mapper.Map<List<PaypalDto>>(await repository.GetAll());
        }

        public async Task update(int id, PaypalDto entity)
        {
            await repository.update(id, mapper.Map<Paypal>(entity));

        }
    }
}

