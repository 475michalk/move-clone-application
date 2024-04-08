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
    public class ReviewService:IService<ReviewDto>
    {
        private readonly IRepository<Review> repository;
        private IMapper mapper;
        public ReviewService(IRepository<Review> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task Add(ReviewDto entity)
        {
           await this.repository.addItem(mapper.Map<Review>(entity));

        }

        public async Task delete(int id)
        {
           await this.repository.delete(id);
        }

        public async Task<ReviewDto> get(int id)
        {
            return mapper.Map<ReviewDto>(await this.repository.GetById(id));
        }

        public async Task<List<ReviewDto>> getAll()
        {
            return mapper.Map<List<ReviewDto>>(await this.repository.GetAll());

        }

        public async Task update(int id, ReviewDto entity)
        {
             await this.repository.update(id, mapper.Map<Review>(entity));

        }

       
    }
}
