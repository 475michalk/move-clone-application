using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;
//using System;
//using System.Xml.Linq;
using MailKit.Security;
//using System.Net;
//using System.Net.Mail;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using PostmarkDotNet.Model;
using MyProject.Controllers;
using Repository.Entity;

//using System;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IService<DriverDto> service;

        public DriverController(IService<DriverDto> service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<List<DriverDto>> GetAll()
        {
           // var driver=service.getAll();
            return await service.getAll();
        }

        [HttpGet("{id}")]
        public async Task<DriverDto> Get(int id)
        {
            return await service.get(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DriverDto driverDto)
        {
            try
            {

                var drivers = await service.getAll();
                var existingDriver = drivers.FirstOrDefault(u => u.Email == driverDto.Email);

                string code = GenerateRandomCode();

                // שליחת מייל למשתמש עם הקוד הרנדומלי
                await SendEmailToUser(driverDto.Email, code);

                if (existingDriver != null)
                {
                    existingDriver.Lat = driverDto.Lat;
                    existingDriver.Lng = driverDto.Lng;
                    await service.update(existingDriver.Id, existingDriver);

                    return Ok(new { message = "Location updated successfully", verificationCode = code });
                }
                if (drivers.Any(u => u.Email == driverDto.Email))
                {
                    return Conflict(new { Message="Email address already exists"});
                }

              
                    // הוספת הנתונים לבסיס הנתונים
                    await service.Add(driverDto);
                    return Ok(new { verificationCode = code });
            

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] DriverDto value)
        {
            await service.update(id, value);

        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.delete(id);
        }

        private string GenerateRandomCode()
        {
            Random random = new Random();
            return random.Next(1000, 9999).ToString();
        }


        //2 mailkit
        private async Task SendEmailToUser(string email, string code)
        {
            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("moveclone.app@gmail.com", "fjjg xitm lgiv pdvp");

                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("move", "moveclone.app@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(email));
                    message.Subject = "Enter the password to move-app";

                    var builder = new BodyBuilder();
                    // Load HTML content from file
                    var htmlContent = System.IO.File.ReadAllText("html/EmailDesign.html");
                    // Set HTML content
                    builder.HtmlBody = htmlContent.Replace("{code}", code);

                    message.Body = builder.ToMessageBody();

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                Console.WriteLine("Mail Sent Successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }
       

    }
}
