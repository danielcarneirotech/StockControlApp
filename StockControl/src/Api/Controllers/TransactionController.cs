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
        public async Task<ActionResult<ApiResponse<Transaction>>> Add(TransactionDTO transaction)
        {
            try
            {
                var command = new AddTransactionCommand { Transaction = transaction };
                var result = await _mediator.Send(command);
                return CreatedAtAction(nameof(Add), new ApiResponse<Transaction>
                {
                    Success = true,
                    Data = result,
                    StatusCode = StatusCodes.Status201Created
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<Transaction>
                {
                    Success = false,
                    Errors = new List<string> { ex.Message },
                    StatusCode = StatusCodes.Status400BadRequest
                });
            }
        }
    }
}
