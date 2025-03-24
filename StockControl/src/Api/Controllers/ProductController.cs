using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockControl.Api.Models;
using StockControl.Application.Commands;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Shared.DTOs;

namespace StockControl.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("/Products")]
        public async Task<ActionResult<List<MinimalProduct>>> Get()
        {
            var query = new GetProductsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Add(MinimalProduct minimalProduct)
        {
            var command = new AddProductCommand { MinimalProduct = minimalProduct };
            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(Add), result);
        }
    }
}