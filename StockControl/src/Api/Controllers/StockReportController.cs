
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockControl.Api.Models;
using StockControl.Shared.DTOs;

namespace StockControl.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StockReportController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StockReportController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<StockReportDTO>>> Get([FromQuery] DateTime reportDate, [FromQuery] string? productCode)
        {
            var query = new GetStockReportQuery { ReportDate = reportDate, ProductCode = productCode ?? string.Empty };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}