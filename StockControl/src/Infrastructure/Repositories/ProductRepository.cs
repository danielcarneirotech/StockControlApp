using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Infrastructure.Data;

namespace StockControl.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly StockControlDbContext _context;

        public ProductRepository(StockControlDbContext context)
        {
            _context = context;
        }

        public async Task<Product> GetByCode(string code)
        {
            return await _context.Products
                .Include(p => p.Transactions)
                .FirstOrDefaultAsync(p => p.Code == code);
        }
    }
}
