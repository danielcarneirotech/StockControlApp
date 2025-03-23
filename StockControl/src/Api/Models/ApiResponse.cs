namespace StockControl.Api.Models;

public class ApiError
{
    public string code { get; set; }
    public string message { get; set; }
    public string field { get; set; }
}

public class ApiResponse<T>
{
    public bool success { get; set; }
    public T data { get; set; }
    public List<ApiError> errors { get; set; } = new List<ApiError>();
    public int statusCode { get; set; }
}