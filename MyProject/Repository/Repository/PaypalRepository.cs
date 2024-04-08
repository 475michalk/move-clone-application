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
    public class PaypalRepository : IRepository<Paypal>
    {
        private readonly IContext _context;
        public PaypalRepository(IContext context)
        {
            _context = context;
        }

        public async Task addItem(Paypal entity)
        {
            await _context.paypals.AddAsync(entity);
            await _context.save();
        }

        public async Task delete(int id)
        {
            _context.paypals.Remove(await GetById(id));
            await _context.save();
        }

        public async Task<List<Paypal>> GetAll()
        {
            return await _context.paypals.ToListAsync();
        }

        public async Task<Paypal> GetById(int Id)
        {
            return await _context.paypals.FirstOrDefaultAsync(x => x.Id == Id);

        }

        public async Task update(int id, Paypal entity)
        {
            Paypal paypal = await GetById(id);
            paypal.OrderId = entity.OrderId;
            paypal.NumberCard = entity.NumberCard;
            paypal.IdentityCard = entity.IdentityCard;
            paypal.Cvc = entity.Cvc;
            paypal.Price = entity.Price;
            await _context.save();
        }
    }
}