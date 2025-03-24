using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StockControl.Domain.Entities;
using StockControl.Shared.DTOs;

namespace StockControl.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetByCode(string code);
        Task<List<MinimalProduct>> GetAll();
        Task<Product> Add(Product product);
    }
}
