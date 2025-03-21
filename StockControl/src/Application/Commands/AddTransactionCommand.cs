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
    public class AddTransactionCommand : IRequest<Transaction>
    {
        public TransactionDTO Transaction { get; set; }


    }
}
