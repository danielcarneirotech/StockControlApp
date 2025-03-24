using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Infrastructure.Data;
using StockControl.Shared.DTOs;

namespace StockControl.Infrastructure.Repositories
{
    public class StockReportRepository : IStockReportRepository
    {
        private readonly StockControlDbContext _context;

        public StockReportRepository(StockControlDbContext context)
        {
            _context = context;
        }

        public async Task<List<StockReportDTO>> GetStockReport(DateTime reportDateStart, DateTime reportDateEnd, string productCode)
        {
            var query = _context.Transactions
            .Include(t => t.Product)
                .Where(t => t.CreatedAt.Date >= reportDateStart.Date && t.CreatedAt.Date <= reportDateEnd.Date);

            if (!string.IsNullOrEmpty(productCode))
            {
                query = query.Where(t => t.Product.Code == productCode);
            }

            var report = await query
                .GroupBy(t => t.Product)
                .Select(g => new StockReportDTO
                {
                    ProductName = g.Key.Name,
                    ProductCode = g.Key.Code,
                    CheckinQuantity = g.Sum(t => t.Type == TransactionType.Checkin ? t.Quantity : 0),
                    CheckoutQuantity = g.Sum(t => t.Type == TransactionType.Checkout ? t.Quantity : 0),
                    Balance = g.Sum(t => t.Type == TransactionType.Checkin ? t.Quantity : -t.Quantity)
                })
                .OrderBy(r => r.ProductName)
                .ToListAsync();

            return report;
        }
    }
}