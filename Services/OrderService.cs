using Delivery_App.Data;
using Delivery_App.Model;
using Microsoft.EntityFrameworkCore;

namespace Delivery_App.Services
{
    public class OrderService
    {
        private readonly MyDbContext _context;

        public OrderService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<Order> GetOrderAsync(int id)
        {
            try
            {
                // Fetch the order object from your DbContext
                var order = await _context.Orders.FindAsync(id);

                return order;
            }
            catch (Exception ex)
            {
                // Log exception here
                throw ex;
            }
        }
        public async Task<Order> GetOrderByUniqueCodeAsync(string uniqueCode)
        {
            try
            {
                // Fetch the order object with the uniqueCode from your DbContext
                var order = await _context.Orders
                                          .Include(o => o.OrderItems)
                                          .ThenInclude(oi => oi.MenuItem)
                                          .SingleOrDefaultAsync(o => o.UniqueCode == uniqueCode);

                return order;
            }
            catch (Exception ex)
            {
                // Log exception here
                throw ex;
            }
        }

        public async Task<Order> SaveOrderAsync(Order order)
        {
            try
            {
                var newOrder = new Order(order.CustomerName, order.Address, order.DistanceInKm, order.OrderMentions);
                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                foreach (var orderItem in order.OrderItems)
                {
                    // Create a new OrderItem with only MenuItemId without the complete MenuItem object
                    var newOrderItem = new OrderItem
                    {
                        MenuItemId = orderItem.MenuItemId,
                        Quantity = orderItem.Quantity,
                        Mentions = orderItem.Mentions,
                        // This line is essential to link OrderItem to its Order
                    };
                    newOrderItem.OrderId = newOrder.Id;

                    _context.OrderItems.Add(newOrderItem);
                }

                await _context.SaveChangesAsync();

                return newOrder; // return newOrder as it now contains the Id provided by the DbContext
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