using Microsoft.AspNetCore.Mvc;
using Delivery_App.Model;
using Delivery_App.Services;
using Delivery_App.Data;

namespace Delivery_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderAsync(id);
            Console.WriteLine(order);
            if (order == null)
            {
                return NotFound();
            }
            Console.WriteLine(order);
            return order;
        }
        // GET: api/Orders/code
        [HttpGet("unique-code/{code}")]
        public async Task<ActionResult<Order>> GetOrderByCode(string code)
        {
            var order = await _orderService.GetOrderByUniqueCodeAsync(code);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        [HttpPost("create")]
        public async Task<ActionResult<string>> CreateOrder([FromBody] Order order)
        {
            try
            {
                var newOrder = await _orderService.SaveOrderAsync(order);

                if (newOrder == null)
                {
                    return BadRequest("Invalid data provided");
                }

                // assuming that UniqueCode is a property of Order
                return CreatedAtAction(nameof(GetOrder), new { id = newOrder.Id }, newOrder.UniqueCode);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, $"Internal server error: {e}");
            }
        }



    }
}
