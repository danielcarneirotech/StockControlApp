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
                throw new ArgumentNullException(nameof(request.ReportDate), ExceptionMessageConstants.ReportDateRequired);
            }
            // Get the TimeZone the API is Running in
            TimeZoneInfo localTimeZone = TimeZoneInfo.Local;

            //get the offset of the local timezone in relation to UTC
            TimeSpan offset = localTimeZone.GetUtcOffset(DateTime.UtcNow);

            // Adjust the end of the date range to the next day in UTC
            DateTime utcReportDateEnd = reportDate.AddDays(1).Subtract(offset);

            // Adjust the start of the date range to the beginning of the day in UTC
            DateTime utcReportDateStart = reportDate.Subtract(offset);

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

            return await _stockReportRepository.GetStockReport(utcReportDateStart, utcReportDateEnd, request.ProductCode);
        }
    }
}