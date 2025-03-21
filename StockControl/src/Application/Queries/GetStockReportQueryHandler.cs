using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StockControl.Shared.DTOs;
using StockControl.Domain.Interfaces;

namespace StockControl.Application.Queries
{
    public class GetStockReportQueryHandler : IRequestHandler<GetStockReportQuery, List<StockReportDTO>>
    {
        private readonly IStockReportRepository _stockReportRepository;

        public GetStockReportQueryHandler(IStockReportRepository stockReportRepository)
        {
            _stockReportRepository = stockReportRepository;
        }

        public async Task<List<StockReportDTO>> Handle(GetStockReportQuery request, CancellationToken cancellationToken)
        {
            return await _stockReportRepository.GetStockReport(request.ReportDate, request.ProductCode);
        }
    }
}