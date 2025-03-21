using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<Transaction>> Add(TransactionDTO transaction)
        {
            try
            {
                var command = new AddTransactionCommand { Transaction = transaction };
                var result = await _mediator.Send(command);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetById(int id)
        {
            return NotFound();
        }
    }
}
