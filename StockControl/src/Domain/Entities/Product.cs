using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StockControl.Domain.Exceptions;

namespace StockControl.Domain.Entities
{
    public class Product
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Code { get; private set; }
        public ICollection<Transaction>? Transactions { get; set; }

        public Product(string code, string name)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentNullException(nameof(code), ProductExceptionMessages.ProductCodeRequired);
            }
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name), ProductExceptionMessages.ProductNameRequired);
            }

            Code = code;
            Name = name;
            Transactions = new List<Transaction>();
        }

        private Product() { }

        public Product(string code, string name, ICollection<Transaction> transactions)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ArgumentNullException(nameof(code), ProductExceptionMessages.ProductCodeRequired);
            }
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name), ProductExceptionMessages.ProductNameRequired);
            }

            Code = code;
            Name = name;
            Transactions = transactions ?? new List<Transaction>();
        }
    }
}




