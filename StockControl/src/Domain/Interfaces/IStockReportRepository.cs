using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StockControl.Shared.DTOs;

namespace StockControl.Domain.Interfaces
{
    public interface IStockReportRepository
    {
        Task<List<StockReportDTO>> GetStockReport(DateTime reportDateStart, DateTime reportDateEnd, string productCode);
    }
}