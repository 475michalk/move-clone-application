using Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IService <T> where T : class
    {
        public Task<List <T> >getAll();
        public Task<T> get(int id);
        public Task update(int id, T entity);
        public Task delete(int id);
        public Task Add(T entity);


    }
}
