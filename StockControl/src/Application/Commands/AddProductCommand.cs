using MediatR;
using StockControl.Domain.Entities;
using StockControl.Shared.DTOs;

namespace StockControl.Application.Commands
{

    public class AddProductCommand : IRequest<Product>
    {
        public MinimalProduct MinimalProduct { get; set; }
    }
}