#nullable disable
using System.ComponentModel.DataAnnotations;

namespace Delivery_App.Model
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
        public Item(string name, string description, decimal price, int restaurantId)
        {
            Name = name;
            Description = description;
            Price = price;
            RestaurantId = restaurantId;

        }
        public override string ToString()
        {
            return $"Id: {Id}, Name: {Name}";
        }
    }
}