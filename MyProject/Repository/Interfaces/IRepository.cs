using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepository<T>
    {
        public Task<List<T>> GetAll();
        public Task<T> GetById(int id);
        public Task delete(int id);
        public Task update(int id, T entity);
        public Task addItem(T item);

    }
}
