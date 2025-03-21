using MediatR;
using StockControl.Shared.DTOs;

public class GetStockReportQuery : IRequest<List<StockReportDTO>>
{
    public DateTime ReportDate { get; set; }
    public string ProductCode { get; set; }
}