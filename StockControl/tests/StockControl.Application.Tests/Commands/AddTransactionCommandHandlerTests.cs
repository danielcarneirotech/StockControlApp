using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using StockControl.Application.Commands;
using StockControl.Application.Exceptions;
using StockControl.Domain.Entities;
using StockControl.Domain.Interfaces;
using StockControl.Shared.DTOs;
using Xunit;

namespace StockControl.Api.Tests
{
    public class AddTransactionCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldAddTransaction_Checkin()
        {
            // Arrange
            var mockProductRepository = new Mock<IProductRepository>();
            var mockTransactionRepository = new Mock<ITransactionRepository>();
            var handler = new AddTransactionCommandHandler(mockTransactionRepository.Object, mockProductRepository.Object);

            var product = new Product("WHEY1KG", "Whey Protein 1kg");
            mockProductRepository.Setup(repo => repo.GetByCode("WHEY1KG")).ReturnsAsync(product);

            var command = new AddTransactionCommand { TransactionDto = new TransactionDTO { ProductCode = "WHEY1KG", Quantity = 10, Type = TransactionType.Checkin, } };

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            mockTransactionRepository.Verify(repo => repo.Add(It.Is<Transaction>(t =>
                t.Product == product &&
                t.Quantity == 10 &&
                t.Type == TransactionType.Checkin &&
                t.CreatedAt.Date == DateTime.UtcNow.Date
            )), Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldAddTransaction_Checkout()
        {
            // Arrange
            var mockProductRepository = new Mock<IProductRepository>();
            var mockTransactionRepository = new Mock<ITransactionRepository>();
            var handler = new AddTransactionCommandHandler(mockTransactionRepository.Object, mockProductRepository.Object);

            var product = new Product(
                "WHEY1KG",
                "Whey Protein 1kg",
                new List<Transaction> { new Transaction { Type = TransactionType.Checkin, Quantity = 10, CreatedAt = DateTime.UtcNow.AddDays(-1) } }
            );


            mockProductRepository.Setup(repo => repo.GetByCode("WHEY1KG")).ReturnsAsync(product);

            var command = new AddTransactionCommand { TransactionDto = new TransactionDTO { ProductCode = "WHEY1KG", Quantity = 5, Type = TransactionType.Checkout } };

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            mockTransactionRepository.Verify(repo => repo.Add(It.Is<Transaction>(t =>
                t.Product == product &&
                t.Quantity == 5 &&
                t.Type == TransactionType.Checkout &&
                t.CreatedAt.Date == DateTime.UtcNow.Date
            )), Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldThrowException_InsufficientStock()
        {
            // Arrange
            var mockProductRepository = new Mock<IProductRepository>();
            var mockTransactionRepository = new Mock<ITransactionRepository>();
            var handler = new AddTransactionCommandHandler(mockTransactionRepository.Object, mockProductRepository.Object);

            var product = new Product("WHEY1KG", "Whey Protein 1kg");
            mockProductRepository.Setup(repo => repo.GetByCode("WHEY1KG")).ReturnsAsync(product);

            var command = new AddTransactionCommand { TransactionDto = new TransactionDTO { ProductCode = "WHEY1KG", Quantity = 5, Type = TransactionType.Checkout } };

            // Act & Assert
            await Assert.ThrowsAsync<InsufficientStockException>(() => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ShouldThrowException_ProductNotFound()
        {
            // Arrange
            var mockProductRepository = new Mock<IProductRepository>();
            var mockTransactionRepository = new Mock<ITransactionRepository>();
            var handler = new AddTransactionCommandHandler(mockTransactionRepository.Object, mockProductRepository.Object);

            mockProductRepository.Setup(repo => repo.GetByCode("INVALID_CODE")).ReturnsAsync((Product)null);

            var command = new AddTransactionCommand { TransactionDto = new TransactionDTO { ProductCode = "INVALID_CODE", Quantity = 10, Type = TransactionType.Checkin } };

            // Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}