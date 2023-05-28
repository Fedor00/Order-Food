using Microsoft.AspNetCore.Mvc;
using Delivery_App.Model;
using Delivery_App.Services;
using Delivery_App.Data;

namespace Delivery_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly RestaurantService _restaurantService;

        public RestaurantsController(RestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        // GET: api/Restaurants/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetById(int id)
        {
            Console.WriteLine(id);
            var restaurant = await _restaurantService.GetRestaurant(id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }

        [HttpGet("page/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> GetRestaurantsPage(int pageNumber, int pageSize)
        {
            Console.WriteLine(pageNumber + " " + pageSize);
            var restaurants = await _restaurantService.GetRestaurantsPage(pageNumber, pageSize);

            // If no restaurants were found, return a 404 Not Found status.
            if (!restaurants.Any())
            {
                return NotFound();
            }

            return Ok(restaurants);
        }
        [HttpGet("rest/{restaurantId}/{pageNr}/{pageSize}")]
        public async Task<ActionResult<PagedList<Item>>> GetItemsByRestaurantId(int restaurantId, int pageNr = 1, [FromQuery] int pageSize = 10)
        {
            var restaurant = await _restaurantService.GetRestaurant(1);
            return Ok(null);
        }
    }
}
