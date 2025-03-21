using MediatR;
using StockControl.Application.Commands;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;

public class AddTransactionCommandHandler : IRequestHandler<AddTransactionCommand, Transaction>
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IProductRepository _productRepository;

    public AddTransactionCommandHandler(ITransactionRepository transactionRepository, IProductRepository productRepository)
    {
        _transactionRepository = transactionRepository;
        _productRepository = productRepository;
    }

    public async Task<Transaction> Handle(AddTransactionCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByCode(request.Transaction.ProductCode);

        if (product == null)
        {
            throw new Exception($"Product with code {request.Transaction.ProductCode} not found.");
        }

        // Validate transaction type
        if (request.Transaction.Type != TransactionType.Checkin && request.Transaction.Type != TransactionType.Checkout)
        {
            throw new Exception($"Invalid transaction type {request.Transaction.Type}. Only Checkin and Checkout are allowed.");
        }

        var transaction = new Transaction
        {
            Product = product,
            Type = request.Transaction.Type,
            Quantity = request.Transaction.Quantity,
            CreatedAt = DateTime.UtcNow
        };

        var currentStock = product.Transactions != null ? product.Transactions
            .Where(t => t.Type == TransactionType.Checkin)
            .Sum(t => t.Quantity) - product.Transactions
            .Where(t => t.Type == TransactionType.Checkout)
            .Sum(t => t.Quantity) : 0;

        if (transaction.Type == TransactionType.Checkout)
        {
            if (currentStock - transaction.Quantity < 0)
            {
                throw new Exception($"Insufficient stock for product {product.Name}. Current stock: {currentStock}, requested: {transaction.Quantity}.");
            }
        }

        _transactionRepository.Add(transaction);
        return transaction;
    }
}