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
    public class OrderingRepository:IRepository<Ordering>
    {
        private readonly IContext _context;
        public OrderingRepository(IContext context)
        {
            _context= context;
        }

        public async Task addItem(Ordering entity)
        {
            await _context.orderings.AddAsync(entity);
            await  _context.save();
        }

        public async Task delete(int id)
        {
            _context.orderings.Remove(await GetById(id));
            await _context.save();
        }

        public async Task<List<Ordering>> GetAll()
        {
            return await  _context.orderings.ToListAsync();
        }

        public async Task<Ordering> GetById(int id)
        {
            return await _context.orderings.FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task update(int id, Ordering entity)
        {
            Ordering ordering = await GetById(id);
            ordering.DriverId = entity.DriverId;
            ordering.UserId = entity.UserId;
            ordering.Source = entity.Source;
            ordering.Status = entity.Status;
            ordering.ChoiseCar = entity.ChoiseCar;
            ordering.DriveTime = entity.DriveTime;
            ordering.Destination = entity.Destination;
            await _context.save();
        }
    }
}
