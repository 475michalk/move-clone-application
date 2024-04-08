using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaypalController : ControllerBase
    {
        private readonly IService<PaypalDto> service;
        public PaypalController(IService<PaypalDto> service)
        {
            this.service = service;
        }
        // GET: api/<PaypalController>
        [HttpGet]
        public async Task<List<PaypalDto>> Get()
        {
            return await service.getAll();
        }

        // GET api/<PaypalController>/5
        [HttpGet("{id}")]
        public async Task<PaypalDto> Get(int id)
        {
            return await service.get(id);
        }

        // POST api/<PaypalController>
        [HttpPost]
        public async Task Post([FromBody] PaypalDto paypalDto)
        {
            await service.Add(paypalDto);
        }

        // PUT api/<PaypalController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] PaypalDto value)
        {
            await service.update(id, value);   
        }

        // DELETE api/<PaypalController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.delete(id);
        }
    }
}
