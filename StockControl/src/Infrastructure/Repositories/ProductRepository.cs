
using Microsoft.EntityFrameworkCore;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Infrastructure.Data;
using StockControl.Shared.DTOs;

namespace StockControl.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly StockControlDbContext _context;

        public ProductRepository(StockControlDbContext context)
        {
            _context = context;
        }

        public async Task<List<MinimalProduct>> GetAll()
        {
            return await _context.Products
            .Include(p => p.Transactions)
                .Select(p => new MinimalProduct
                {
                    Code = p.Code,
                    Name = p.Name,
                })
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<Product> Add(Product product)
        {

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product> GetByCode(string code)
        {
            return await _context.Products
                .Include(p => p.Transactions)
                .FirstOrDefaultAsync(p => p.Code == code);
        }
    }
}
