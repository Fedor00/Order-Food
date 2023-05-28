using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Delivery_App.Model
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string UniqueCode { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public int DistanceInKm { get; set; }
        public string OrderMentions { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public Order(string customerName, string address, int distanceInKm, string orderMentions)
        {
            CustomerName = customerName;
            Address = address;
            DistanceInKm = distanceInKm;
            OrderMentions = orderMentions;
            OrderItems = new List<OrderItem>();
            UniqueCode = Guid.NewGuid().ToString();
        }

        public override string ToString()
        {
            return $"Order Details:\n" +
                   $"ID: {Id}\n" +
                   $"Unique Code: {UniqueCode}\n" +
                   $"Customer Name: {CustomerName}\n" +
                   $"Address: {Address}\n" +
                   $"Distance: {DistanceInKm} km\n" +
                   $"Order Mentions: {OrderMentions}\n";
        }
    }
}