namespace StockControl.Api.Models;

public class ApiError
{
    public string Code { get; set; }
    public string Message { get; set; }
    public string Field { get; set; } // Optional: Field associated with the error
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T Data { get; set; }
    public List<ApiError> Errors { get; set; } = new List<ApiError>();
    public int StatusCode { get; set; }
}