using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StockControl.Domain.Entities;

namespace StockControl.Domain.Interfaces
{
    public interface IProductRepository
    {
        Product GetByCode(string code);
    }
}
