﻿using System;
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

        public Product GetByCode(string code)
        {

            return _context.Products
                .Include(p => p.Transactions)
                .FirstOrDefault(p => p.Code == code);
        }

        public void Add(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void Update(Product product)
        {
            throw new NotImplementedException();
        }

        public void Remove(Product product)
        {
            throw new NotImplementedException();
        }

        // Implement other methods...
    }
}
