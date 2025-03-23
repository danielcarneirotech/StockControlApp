using MediatR;
using StockControl.Shared.DTOs;
using StockControl.Domain.Interfaces;
using StockControl.Application.Constants;

namespace StockControl.Application.Queries
{
    public class GetStockReportQueryHandler : IRequestHandler<GetStockReportQuery, List<StockReportDTO>>
    {
        private readonly IStockReportRepository _stockReportRepository;
        private readonly IProductRepository _productRepository;

        public GetStockReportQueryHandler(IStockReportRepository stockReportRepository, IProductRepository productRepository)
        {
            _stockReportRepository = stockReportRepository;
            _productRepository = productRepository;
        }

        public async Task<List<StockReportDTO>> Handle(GetStockReportQuery request, CancellationToken cancellationToken)
        {
            var reportDate = request.ReportDate;
            var productCode = request.ProductCode;

            if (reportDate == default)
            {
                throw new ArgumentNullException(nameof(reportDate), ExceptionMessageConstants.ReportDateRequired);
            }

            if (reportDate > DateTime.Now)
            {
                throw new ArgumentOutOfRangeException(nameof(reportDate), ExceptionMessageConstants.ReportDateFuture);
            }

            if (!string.IsNullOrEmpty(productCode))
            {
                var product = await _productRepository.GetByCode(productCode);

                if (product == null)
                {
                    throw new KeyNotFoundException(string.Format(ExceptionMessageConstants.InvalidProductCode, productCode));
                }
            }

            return await _stockReportRepository.GetStockReport(request.ReportDate, request.ProductCode);
        }
    }
}