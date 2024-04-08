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
    public class UserService : IService<UserDto>
    {

        private readonly IRepository<Users> repository;

        private IMapper mapper;
        public UserService(IRepository<Users> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task Add(UserDto entity)
        {
           await repository.addItem(mapper.Map<Users>(entity));
        }

        public async Task delete(int id)
        {
           await repository.delete(id);

        }

        public async Task< UserDto> get(int id)
        {
            return mapper.Map<UserDto>(await repository.GetById(id));
        }

        public async Task< List<UserDto>> getAll()
        {
            return mapper.Map<List<UserDto>>(await repository.GetAll());

        }

        public async Task update(int id, UserDto entity)
        {
           await repository.update(id, mapper.Map<Users>(entity));
        }
    }
}
