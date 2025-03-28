﻿using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Infrastructure.Data;

namespace StockControl.Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly StockControlDbContext _context;

        public TransactionRepository(StockControlDbContext context)
        {
            _context = context;
        }

        public void Add(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
        }
    }
}
