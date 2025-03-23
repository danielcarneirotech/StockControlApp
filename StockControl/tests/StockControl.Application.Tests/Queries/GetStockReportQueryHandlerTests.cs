using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using StockControl.Application.Constants;
using StockControl.Application.Queries;
using StockControl.Domain.Entities;
using StockControl.Infrastructure.Data;
using StockControl.Infrastructure.Repositories;
using StockControl.Shared.DTOs;
using Xunit;

namespace StockControl.Api.Tests
{
    public class GetStockReportQueryHandlerTests
    {

        [Fact]
        public async Task GestStockReport_ShouldReturnStockReport_WhenReportDateIsValid()
        {
            var databaseName = Guid.NewGuid().ToString();
            // Arrange
            var options = new DbContextOptionsBuilder<StockControlDbContext>()
                .UseInMemoryDatabase(databaseName: databaseName)
                .Options;

            using (var context = new StockControlDbContext(options))
            {
                var whey = new Product { Id = 1, Name = "Whey Protein 1kg", Code = "WHEY1KG" };
                var creatine = new Product { Id = 2, Name = "Creatine 300g", Code = "CREATINE300G" };

                context.Products.AddRange(whey, creatine);
                context.SaveChanges();

                context.Transactions.AddRange(
                    new Transaction { Product = whey, Type = TransactionType.Checkin, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 10 },
                    new Transaction { Product = whey, Type = TransactionType.Checkout, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 3 },
                    new Transaction { Product = whey, Type = TransactionType.Checkin, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 12 },
                    new Transaction { Product = whey, Type = TransactionType.Checkout, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 5 },
                    new Transaction { Product = creatine, Type = TransactionType.Checkin, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 20 },
                    new Transaction { Product = creatine, Type = TransactionType.Checkout, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 5 }
                );

                context.SaveChanges();

                var stockReportRepository = new StockReportRepository(context);
                var productRepository = new ProductRepository(context);
                var handler = new GetStockReportQueryHandler(stockReportRepository, productRepository);
                var query = new GetStockReportQuery { ReportDate = DateTime.UtcNow.Date.AddDays(-1), ProductCode = "WHEY1KG" };

                var expectedReport = new List<StockReportDTO>
                {
                    new StockReportDTO
                    {
                        ProductName = "Whey Protein 1kg",
                        ProductCode = "WHEY1KG",
                        CheckinQuantity = 22, // 10 + 12
                        CheckoutQuantity = 8, // 3 + 5
                        Balance = 14 // 22 - 8
                    }
                };

                // Act
                var result = await handler.Handle(query, CancellationToken.None);

                // Assert
                result.Should().BeEquivalentTo(expectedReport);
            }
        }

        [Fact]
        public async Task GestStockReport_ShouldReturnStockReport_WhenReportDateIsValidAndProductCodeIsEmpty()
        {
            var databaseName = Guid.NewGuid().ToString();
            // Arrange
            var options = new DbContextOptionsBuilder<StockControlDbContext>()
                .UseInMemoryDatabase(databaseName: databaseName)
                .Options;

            using (var context = new StockControlDbContext(options))
            {
                // Seed data with navigation properties set
                var whey = new Product { Id = 1, Name = "Whey Protein 1kg", Code = "WHEY1KG" };
                var creatine = new Product { Id = 2, Name = "Creatine 300g", Code = "CREATINE300G" };

                context.Products.AddRange(whey, creatine);
                context.SaveChanges();

                context.Transactions.AddRange(
                    new Transaction { Product = whey, Type = TransactionType.Checkin, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 10 },
                    new Transaction { Product = whey, Type = TransactionType.Checkout, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 3 },
                    new Transaction { Product = whey, Type = TransactionType.Checkin, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 12 },
                    new Transaction { Product = whey, Type = TransactionType.Checkout, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 5 },
                    new Transaction { Product = creatine, Type = TransactionType.Checkin, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 20 },
                    new Transaction { Product = creatine, Type = TransactionType.Checkout, CreatedAt = DateTime.UtcNow.Date.AddDays(-1), Quantity = 5 }
                );

                context.SaveChanges();

                var stockReportRepository = new StockReportRepository(context);
                var productRepository = new ProductRepository(context);
                var handler = new GetStockReportQueryHandler(stockReportRepository, productRepository);
                var query = new GetStockReportQuery { ReportDate = DateTime.UtcNow.Date.AddDays(-1), ProductCode = "" };

                var expectedReport = new List<StockReportDTO>
                {
                    new StockReportDTO
                    {
                        ProductName = "Whey Protein 1kg",
                        ProductCode = "WHEY1KG",
                        CheckinQuantity = 22, // 10 + 12
                        CheckoutQuantity = 8, // 3 + 5
                        Balance = 14 // 22 - 8
                    },
                    new StockReportDTO
                    {
                        ProductName = "Creatine 300g",
                        ProductCode = "CREATINE300G",
                        CheckinQuantity = 20,
                        CheckoutQuantity = 5,
                        Balance = 15
                    }
                };

                // Act
                var result = await handler.Handle(query, CancellationToken.None);

                // Assert
                result.Should().BeEquivalentTo(expectedReport);
            }
        }

        [Fact]
        public async Task GetStockReport_ShouldThrowArgumentException_WhenReportDateIsDefault()
        {
            var databaseName = Guid.NewGuid().ToString();
            // Arrange
            var options = new DbContextOptionsBuilder<StockControlDbContext>()
                .UseInMemoryDatabase(databaseName: databaseName)
                .Options;

            using (var context = new StockControlDbContext(options))
            {
                var stockReportRepository = new StockReportRepository(context);
                var productRepository = new ProductRepository(context);
                var handler = new GetStockReportQueryHandler(stockReportRepository, productRepository);

                var query = new GetStockReportQuery { ReportDate = default, ProductCode = "WHEY1KG" };

                // Act & Assert
                await Assert.ThrowsAsync<ArgumentNullException>(() => handler.Handle(query, CancellationToken.None));
            }
        }

        [Fact]
        public async Task Handle_ShouldThrowArgumentOutOfRangeException_WhenReportDateIsInFuture()
        {
            var databaseName = Guid.NewGuid().ToString();
            // Arrange
            var options = new DbContextOptionsBuilder<StockControlDbContext>()
                .UseInMemoryDatabase(databaseName: databaseName)
                .Options;

            using (var context = new StockControlDbContext(options))
            {
                var stockReportRepository = new StockReportRepository(context);
                var productRepository = new ProductRepository(context);
                var handler = new GetStockReportQueryHandler(stockReportRepository, productRepository);

                var query = new GetStockReportQuery { ReportDate = DateTime.Now.AddDays(1), ProductCode = "WHEY1KG" };

                // Act & Assert
                var exception = await Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => handler.Handle(query, CancellationToken.None));

                Assert.Equal(nameof(query.ReportDate).ToLower(), exception.ParamName?.ToLower());
            }
        }

    }
}