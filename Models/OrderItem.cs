#nullable disable
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Delivery_App.Model
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Mentions { get; set; }
        public int MenuItemId { get; set; }
        public Item MenuItem { get; set; }

        public int OrderId { get; set; } // foreign key property
        [JsonIgnore]
        public Order Order { get; set; } // navigation property

        public OrderItem(int quantity, string mentions, int menuItemId)
        {
            Quantity = quantity;
            Mentions = mentions;
            MenuItemId = menuItemId;
        }

        public OrderItem()
        {
        }
    }

}