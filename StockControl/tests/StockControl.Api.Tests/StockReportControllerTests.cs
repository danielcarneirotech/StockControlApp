using System;
using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace StockControl.Api.Tests
{
    public class StockReportControllerTests : IClassFixture<WebApplicationFactory<StockControl.Api.Program>>
    {
        private readonly WebApplicationFactory<Api.Program> _factory;

        public StockReportControllerTests(WebApplicationFactory<Api.Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetStockReport_ShouldReturnOk()
        {
            // Arrange
            var client = _factory.CreateClient();
            var reportDate = DateTime.UtcNow.Date;

            // Act
            var response = await client.GetAsync($"/stockreport?reportDate={reportDate:yyyy-MM-dd}");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task GetStockReport_WithProductCode_ShouldReturnOk()
        {
            // Arrange
            var client = _factory.CreateClient();
            var reportDate = DateTime.UtcNow.Date;
            var productCode = "WHEY1KG";

            // Act
            var response = await client.GetAsync($"/stockreport?reportDate={reportDate:yyyy-MM-dd}&productCode={productCode}");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}