
using Delivery_App.Data;
using Delivery_App.Model;

namespace Delivery_App.Services
{
    public class RestaurantService
    {
        private readonly MyDbContext _context;

        public RestaurantService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<Restaurant> GetRestaurant(int id)
        {
            // Get Restaurant by id
            var restaurant = await _context.Restaurants.FindAsync(id);
            return restaurant;
        }
        public async Task<PagedList<Restaurant>> GetRestaurantsPage(int pageNumber, int pageSize)
        {
            var restaurants = await PagedList<Restaurant>.CreateAsync(_context.Restaurants, pageNumber, pageSize);
            return restaurants;
        }




        // Other method implementations
    }
}