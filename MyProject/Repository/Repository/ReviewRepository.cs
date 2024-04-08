using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ReviewRepository:IRepository<Review>
    {
        private readonly IContext _context;
        public ReviewRepository(IContext context)
        {
            _context = context;
        }

        public async Task addItem(Review entity)
        {
            await _context.reviews.AddAsync(entity);
            await _context.save();
        }

        public async Task delete(int id)
        {
            _context.reviews.Remove(await GetById(id));
            await _context.save();
        }

        public async Task<List<Review>> GetAll()
        {
            return await _context.reviews.ToListAsync();
        }

        public async Task<Review> GetById(int id)
        {
            return await _context.reviews.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task update(int id, Review entity)
        {
            Review review = await GetById(id);
            review.UserId = entity.UserId;
            review.OrderId = entity.OrderId;
            review.Comment = entity.Comment;
            review.Rating = entity.Rating;
            review.Date = entity.Date;
             await _context.save();
        }
        public async Task<List<Review>> GetAllAsync()
        {
            return await _context.reviews.ToListAsync();
        }

    }
}
