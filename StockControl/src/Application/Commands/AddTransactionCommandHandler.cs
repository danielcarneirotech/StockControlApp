using MediatR;
using StockControl.Application.Commands;
using StockControl.Application.Constants;
using StockControl.Application.Exceptions;
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
        var productCode = request.TransactionDto.ProductCode;
        var transactionType = request.TransactionDto.Type;
        var quantity = request.TransactionDto.Quantity;

        if (transactionType != TransactionType.Checkin && transactionType != TransactionType.Checkout)
        {
            var transactionTypeName = Enum.GetName(typeof(TransactionType), transactionType);

            var transactionTypes = Enum.GetValues(typeof(TransactionType))
                .Cast<TransactionType>()
                .Select(t => $"{t}({(int)t})")
                .ToList();

            var transactionTypesString = string.Join(", ", transactionTypes);

            var exceptionMessage = string.Format(ExceptionMessageConstants.InvalidTransactionType, transactionTypeName, transactionTypesString);

            throw new ArgumentOutOfRangeException(nameof(transactionType), exceptionMessage);
        }

        var product = await _productRepository.GetByCode(productCode);

        if (product == null)
        {
            throw new KeyNotFoundException(string.Format(ExceptionMessageConstants.ProductNotFound, productCode));
        }

        var transaction = new Transaction
        {
            Product = product,
            Type = transactionType,
            Quantity = quantity,
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
                throw new InsufficientStockException(productCode, currentStock, transaction.Quantity);
            }
        }

        _transactionRepository.Add(transaction);
        return transaction;
    }
}