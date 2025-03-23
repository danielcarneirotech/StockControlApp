using MediatR;
using StockControl.Application.DTOs;
using StockControl.Domain.Entities;

namespace StockControl.Application.Commands
{
    public class AddTransactionCommand : IRequest<Transaction>
    {
        public TransactionDTO TransactionDto { get; set; }
    }
}
