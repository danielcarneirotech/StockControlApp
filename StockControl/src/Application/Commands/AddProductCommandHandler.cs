using MediatR;
using StockControl.Application.Commands;
using StockControl.Application.Constants;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Shared.DTOs;

public class AddProductCommandHandler : IRequestHandler<AddProductCommand, Product>
{
    private readonly IProductRepository _productRepository;
    private readonly ITransactionRepository _transactionRepository;

    public AddProductCommandHandler(IProductRepository productRepository, ITransactionRepository transactionRepository)
    {
        _productRepository = productRepository;
        _transactionRepository = transactionRepository;
    }

    public async Task<Product> Handle(AddProductCommand request, CancellationToken cancellationToken)
    {
        var productName = request.MinimalProduct.Name;
        var productCode = request.MinimalProduct.Code;

        var product = new Product(productCode, productName);

        var existingProduct = await _productRepository.GetByCode(productCode);
        if (existingProduct != null)
        {
            throw new ArgumentException(string.Format(ExceptionMessageConstants.ProductCodeAlreadyExists, productCode), nameof(productCode));
        }

        await _productRepository.Add(product);

        return product;
    }
}