using Delivery_App.Data;
using Delivery_App.Model;

namespace Delivery_App.Services
{
    public class OrderItemService
    {
        private readonly MyDbContext _context;

        public OrderItemService(MyDbContext context)
        {
            _context = context;
        }
        public async Task<OrderItem> SaveOrderItemAsync(OrderItem orderItem)
        {
            try
            {
                // Add the order object to your DbContext
                await _context.OrderItems.AddAsync(orderItem);

                // Save the changes to the database
                await _context.SaveChangesAsync();

                // Return the order object which now includes the database generated ID
                return orderItem;
            }
            catch (Exception ex)
            {
                // Log exception here
                throw ex;
            }
        }

        // Other method implementations
    }
}