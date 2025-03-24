using MediatR;
using StockControl.Domain.Entities;
using StockControl.Shared.DTOs;

namespace StockControl.Application.Commands
{
    public class AddTransactionCommand : IRequest<Transaction>
    {
        public TransactionDTO TransactionDto { get; set; }
    }
}
