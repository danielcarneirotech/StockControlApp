using System;
using StockControl.Application.Constants;

namespace StockControl.Application.Exceptions;

public class InsufficientStockException : Exception
{
    public string ProductCode { get; }
    public int CurrentStock { get; }
    public int RequestedQuantity { get; }

    public InsufficientStockException(string productCode, int currentStock, int requestedQuantity)
        : base(string.Format(ExceptionMessageConstants.InsufficientStock, productCode, currentStock, requestedQuantity))
    {
        ProductCode = productCode;
        CurrentStock = currentStock;
        RequestedQuantity = requestedQuantity;
    }
}