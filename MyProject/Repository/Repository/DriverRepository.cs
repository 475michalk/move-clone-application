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
    public class DriverRepository :IRepository<Drivers>
    {
        private readonly IContext _context;
        public DriverRepository(IContext context)
        {
            _context = context;
        }

        public async Task addItem(Drivers entity)
        {
            await _context.drivers.AddAsync(entity);
            await _context.save();
        }

        public async Task delete(int id)
        {
            _context.drivers.Remove(await GetById(id));
            await _context.save();
        }

        public async Task<List<Drivers>> GetAll()
        {

            return await _context.drivers.ToListAsync();
        }

        public async Task<Drivers> GetById(int id)
        {
            return await _context.drivers.FirstOrDefaultAsync(x => x.Id == id);


        }

        public async Task update(int id, Drivers entity)
        {
            Drivers drivers = await GetById(id);
            drivers.NameDriver = entity.NameDriver;
            drivers.Status = entity.Status;
           // drivers.ChoiseCar = entity.ChoiseCar;
           // drivers.ContactMethod = entity.ContactMethod;
            drivers.PhoneNumber = entity.PhoneNumber;
            drivers.Status = entity.Status;
            drivers.Email = entity.Email;
            drivers.Password = entity.Password;
            drivers.Lat = entity.Lat;
            drivers.Lng = entity.Lng;
            await _context.save();
        }
       
    }
}
