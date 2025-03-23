using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockControl.Api.Models;
using StockControl.Application.Commands;
using StockControl.Application.DTOs;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;

namespace StockControl.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TransactionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> Add(TransactionDTO transactionDto)
        {
            var command = new AddTransactionCommand { TransactionDto = transactionDto };
            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(Add), result);
        }
    }
}
