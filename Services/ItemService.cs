
using Delivery_App.Data;
using Delivery_App.Model;

namespace Delivery_App.Services
{
    public class ItemService
    {
        private readonly MyDbContext _context;

        public ItemService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Item>> GetItemsByRestaurantId(int restaurantId, int pageNumber, int pageSize)
        {
            var items = _context.Items.Where(i => i.RestaurantId == restaurantId);

            var paginatedItems = await PagedList<Item>.CreateAsync(items, pageNumber, pageSize);

            return paginatedItems;
        }






        // Other method implementations
    }
}