using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockControl.Domain.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public TransactionType Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Quantity { get; set; }
    }

    public enum TransactionType
    {
        Checkin,
        Checkout
    }
}
