using Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IService<UserDto> service;
        public UserController(IService<UserDto> service)
        {
            this.service = service;
        }
        // GET: api/<CompanyController>
        [HttpGet]
        public async Task <List<UserDto>> GetAll()
        {
            return  await service.getAll();
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public async Task< UserDto> Get(int id)
        {
            return await service.get(id);
        }

       
        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDto value)
        {
            // קבל את רשימת כל המשתמשים
            var users = await service.getAll();

            // בדוק אם כתובת האימייל שנשלחה כבר קיימת במסד הנתונים
            if (users.Any(u => u.Email == value.Email))
            {
                // אם כן, החזר תגובת שגיאה
                return Conflict("Email address already exists");
            }

            // אם הכתובת אימייל לא קיימת, הוסף את המשתמש למסד הנתונים
            await service.Add(value);

            // החזר תגובת הצלחה
            return Ok();
        }
        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] UserDto value)
        {
           await service.update(id, value);
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
           await service.delete(id);
        }
    }
}
