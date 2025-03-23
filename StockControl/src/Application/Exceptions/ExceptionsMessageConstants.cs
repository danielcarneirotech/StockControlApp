namespace StockControl.Application.Constants;

public static class ExceptionMessageConstants
{
    public const string InvalidTransactionType = "Invalid transaction type '{0}'. Only {1} are allowed.";
    public const string ProductNotFound = "Product with code '{0}' not found.";
    public const string InsufficientStock = "Insufficient stock for product '{0}'. Current stock: {1}, requested: {2}.";
    public const string ReportDateRequired = "Report date is required.";
    public const string ReportDateFuture = "Report date cannot be in the future.";
    public const string InvalidProductCode = "Product with code '{0}' not found.";

}