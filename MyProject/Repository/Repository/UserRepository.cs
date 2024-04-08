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
    public class UserRepository:IRepository<Users>
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
        }

        public async Task addItem(Users entity)
        {
            await _context.users.AddAsync(entity);
            await _context.save();
        }

        public async Task delete(int id)
        {
            _context.users.Remove(await GetById(id));
            await _context.save();
        }

        public async Task<List<Users>> GetAll()
        {
            return await _context.users.ToListAsync();
        }

        public async Task<Users> GetById(int UserId)
        {
            return await _context.users.Include(p=>p.OrderList).FirstOrDefaultAsync(x => x.Id == UserId);

        }

        public async Task update(int id, Users entity)
        {
            Users users =await GetById(id);
            users.Username = entity.Username;
            users.Password = entity.Password;
            users.Email = entity.Email;
           // users.PhoneNumber = entity.PhoneNumber;
            await _context.save();
        }
    }
}
