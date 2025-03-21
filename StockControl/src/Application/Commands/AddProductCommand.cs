using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using StockControl.Application.DTOs;
using StockControl.Domain.Entities;

namespace StockControl.Application.Commands
{
    public class AddProductCommand : IRequest<Product>
    {
        public ProductDTO Product { get; set; }
    }
}
