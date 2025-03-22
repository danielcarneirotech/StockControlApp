namespace StockControl.Api.Models;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T Data { get; set; }
    public List<string> Errors { get; set; } = new List<string>();
    public int StatusCode { get; set; }
}