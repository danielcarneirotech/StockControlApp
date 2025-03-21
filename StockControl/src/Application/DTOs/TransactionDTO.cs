using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StockControl.Domain.Entities;

namespace StockControl.Application.DTOs
{
    public class TransactionDTO
    {
        [Required]
        public string ProductCode { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
