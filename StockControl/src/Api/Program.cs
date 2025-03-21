using Microsoft.EntityFrameworkCore;
using StockControl.Domain.Interfaces;
using StockControl.Infrastructure.Data;
using StockControl.Infrastructure.Repositories;
using MediatR;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using StockControl.Application.Commands;
using System.Text.Json.Serialization;

namespace StockControl.Api;

public partial class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        });

        // Configure DbContext
        builder.Services.AddDbContext<StockControlDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Register repositories
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
        builder.Services.AddScoped<IStockReportRepository, StockReportRepository>();


        // Configure MediatR
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AddTransactionCommand).Assembly));
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetStockReportQuery).Assembly));

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();

    }
}

