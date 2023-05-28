#nullable disable
namespace Delivery_App.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Restaurant
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Schedule { get; set; }
        public decimal MinimumOrder { get; set; }
        public int StandardDeliveryMaxDistance { get; set; }
        public decimal StandardDeliveryPrice { get; set; }
        public decimal ExtraDeliveryFee { get; set; }
        public ICollection<Item> Items { get; set; }
        public Restaurant(string name, string schedule, decimal minimumOrder, int standardDeliveryMaxDistance, decimal standardDeliveryPrice, decimal extraDeliveryFee)
        {
            Name = name;
            Schedule = schedule;
            MinimumOrder = minimumOrder;
            StandardDeliveryMaxDistance = standardDeliveryMaxDistance;
            StandardDeliveryPrice = standardDeliveryPrice;
            ExtraDeliveryFee = extraDeliveryFee;
            Items = new List<Item>();
        }
    }

}