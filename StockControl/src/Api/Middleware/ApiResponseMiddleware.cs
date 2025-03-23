using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using StockControl.Api.Models;

namespace StockControl.Api.Middleware;

public class ApiResponseMiddleware
{
    private readonly RequestDelegate _next;

    public ApiResponseMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var originalBodyStream = context.Response.Body;
        using var responseBody = new MemoryStream();
        context.Response.Body = responseBody;

        try
        {
            await _next(context);

            responseBody.Seek(0, SeekOrigin.Begin);
            var responseBodyText = await new StreamReader(responseBody).ReadToEndAsync();

            var result = JsonSerializer.Deserialize<object>(responseBodyText);

            var apiResponse = new ApiResponse<object>
            {
                Success = true,
                Data = result,
                StatusCode = context.Response.StatusCode
            };

            var json = JsonSerializer.Serialize(apiResponse);

            context.Response.Body = originalBodyStream;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(json);
        }
        catch (Exception ex)
        {
            context.Response.Body = originalBodyStream;
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var apiResponse = new ApiResponse<object>
            {
                Success = false,
                Errors = new List<ApiError>
                {
                    new ApiError
                    {
                        Code = ex.GetType().Name,
                        Message = ex.Message.Contains("(Parameter '") ? ex.Message.Substring(0, ex.Message.IndexOf(" (Parameter '")) : ex.Message,
                        Field = GetFieldFromException(ex) ?? string.Empty,
                    }
                },
                StatusCode = (int)HttpStatusCode.InternalServerError
            };

            var json = JsonSerializer.Serialize(apiResponse);
            await context.Response.WriteAsync(json);
        }
    }


    private string? GetFieldFromException(Exception ex)
    {
        if (ex is ArgumentException argumentException)
        {
            return argumentException.ParamName ?? string.Empty;
        }
        return null;
    }
}