using StockControl.Domain.Entities;

namespace StockControl.Domain.Interfaces
{
    public interface ITransactionRepository
    {
        void Add(Transaction transaction);

    }
}
