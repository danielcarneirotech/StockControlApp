using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
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
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<Product>> GetByCode(string code)
        {
            // var query = new GetProductByCodeQuery { Code = code };
            // var result = await _mediator.Send(query);
            // if (result == null)
            // {
            //     return NotFound();
            // }
            // return Ok(result);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Add(ProductDTO product)
        {
            var command = new AddProductCommand { Product = product };
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetByCode), new { code = result.Code }, result);
        }


    }
}
