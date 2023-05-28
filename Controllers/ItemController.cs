using Microsoft.AspNetCore.Mvc;
using Delivery_App.Model;
using Delivery_App.Services;
using Delivery_App.Data;

namespace Delivery_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ItemService _itemService;

        public ItemController(ItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("restaurants/{restaurantId}/{pageNr}/{pageSize}")]
        public async Task<ActionResult<PagedList<Item>>> GetItemsByRestaurantId(int restaurantId, int pageNr = 1, [FromQuery] int pageSize = 10)
        {
            Console.WriteLine(restaurantId + " " + pageNr + " " + pageSize);
            var items = await _itemService.GetItemsByRestaurantId(restaurantId, pageNr, pageSize);
            foreach (var item in items)
            {
                Console.WriteLine($"Item ID: {item.Id}");
                Console.WriteLine($"Name: {item.Name}");
                Console.WriteLine($"Description: {item.Description}");
                Console.WriteLine($"Price: {item.Price}");
                Console.WriteLine(); // Empty line for separation
            }
            if (items == null || items.Count == 0)
            {
                return NotFound();
            }
            Console.WriteLine(items);
            return Ok(items);
        }
    }
}
