using Common.Entity;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Service.Interfaces;
using System.Net.Mail;
using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using Service.Service;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderingController : ControllerBase
    {

        private readonly IService<OrderingDto> orderingService;
        private readonly IService<UserDto> userService;

        public OrderingController(IService<OrderingDto> orderingService, IService<UserDto> userService)
        {
            this.orderingService = orderingService;
            this.userService = userService;
        }
        // GET: api/<CompanyController>
        [HttpGet]
        public async Task<List<OrderingDto>> Get()
        {

            return await orderingService.getAll();



        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var existingOrder = await orderingService.get(id);

                if (existingOrder == null)
                {
                    return NotFound(new { message = "Order not found" });
                }

                var user = await userService.get(existingOrder.UserId);

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Extract email from the user details
                var userEmail = user.Email;

                // Send email or do other operations with the user email
                await SendEmailToUser(userEmail, existingOrder.Source, existingOrder.Destination, existingOrder.ChoiseCar);

                return Ok(existingOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        // POST api/<CompanyController>
        [HttpPost]
        public async Task Post([FromBody] OrderingDto value)
        {
            await orderingService.Add(value);
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] OrderingDto value)
        {
            await orderingService.update(id, value);
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await orderingService.delete(id);
        }
        private async Task SendEmailToUser(string email, string source, string Destination, string car)
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
                    message.Subject = "Order Confirmation in move-app";

                    var builder = new BodyBuilder();
                    // Load HTML content from file
                    var htmlContent = System.IO.File.ReadAllText("html/EmailDesignOrderingUser.html");
                    // Set HTML content with the correct values
                    builder.HtmlBody = htmlContent
                        .Replace("{source}", source)
                        .Replace("{Destination}", Destination)
                        .Replace("{car}", car);

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
