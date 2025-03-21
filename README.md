# Stock Control API

**Author:** Daniel Carneiro
**Company:** Accruent
**Contact:** daniel.carneiro@accruent.com

## Project Overview

This project is a RESTful API designed for managing stock control for a fitness shop. It provides endpoints to manage products and their transactions (check-ins and check-outs). The API ensures data integrity by preventing negative stock levels and validating product codes.

## Architecture

The project follows a Clean Architecture approach with Domain-Driven Design (DDD) principles. It is structured into distinct layers to separate concerns and improve maintainability:

* **Domain:** Contains core business logic and entities.
* **Application:** Handles application-specific logic, commands, queries, and DTOs.
* **Infrastructure:** Manages external dependencies like database access and repositories.
* **Api:** Exposes the API endpoints and handles HTTP requests.

### Design Patterns

* **Repository Pattern:** Used to abstract data access and provide a consistent interface for interacting with the database.
* **Mediator Pattern (via MediatR):** Decouples request handling from the controllers, promoting a clean and maintainable codebase.
* **Command/Query Responsibility Segregation (CQRS):** While not fully implemented, the project structure is designed to support CQRS, with commands for write operations and queries for read operations.
* **Dependency Injection (DI):** Used extensively to manage dependencies and promote loose coupling.

## Database

* **SQL Server:** Used as the relational database to persist product and transaction data.
* **Entity Framework Core (EF Core):** Used as the ORM to interact with the database.
* **Migrations:** EF Core migrations are used to manage database schema changes.
* Initial data for products is seeded through migrations.

## Features

* **Product Management:**
    * Retrieve products by code.
    * Add new products with unique product codes.
    * Initial product data seeding for development and testing.
* **Transaction Management:**
    * Add check-in transactions to increase stock levels.
    * Add check-out transactions to decrease stock levels.
    * Prevent transactions that would result in negative stock levels.
    * Validate product codes against existing products.
* **Stock Reporting:**
    * Generate comprehensive stock reports showing current stock levels for all products.
    * Retrieve stock reports via API endpoint.
* **API Documentation:**
    * Swagger/OpenAPI for interactive API documentation and testing.

## Testing

This project includes comprehensive unit and integration tests to ensure the reliability and correctness of the Stock Control application.

### Unit Tests

We use xUnit as the testing framework and Moq for mocking dependencies.

**Key Test Areas:**

* **Adding Products:** Tests verify that products can be added successfully, including validation for unique product codes and handling of duplicate code scenarios.
* **Adding Transactions:** Tests cover adding check-in and check-out transactions, including validation for sufficient stock levels and handling of invalid product codes.
* **Retrieving Stock Reports:** Tests ensure that stock reports are generated accurately, including calculations of current stock levels.

## Future Improvements

This section outlines potential enhancements and improvements that can be made to the Stock Control API to further enhance its functionality, robustness, and user experience.

* **Enhanced Input Validation and Error Handling:**
    * **Why:** Provide more detailed and user-friendly error messages for invalid input. This improves the developer experience by providing clear guidance on how to correct errors.
    * **How:** Implement more granular validation rules using data annotations or FluentValidation. Customize error responses to include specific error codes and messages.
* **Consistent API Response Structure:**
    * **Why:** Standardize the API response format to include metadata such as status codes, error messages, and pagination information. This makes it easier for clients to parse and handle responses consistently.
    * **How:** Create a wrapper class for API responses that includes common fields. Use middleware or filters to automatically wrap responses in this class.
* **API Versioning:**
    * **Why:** Implement API versioning to allow for backward-compatible changes and to support multiple versions of the API simultaneously. This ensures that clients are not affected by breaking changes.
    * **How:** Use URL-based versioning (e.g., `/v1/products`) or header-based versioning (e.g., `Accept: application/vnd.stockcontrol.v2+json`).
* **Authentication and Authorization:**
    * **Why:** Add authentication and authorization to secure the API and control access to sensitive data. This ensures that only authorized users can perform certain actions.
    * **How:** Implement JWT authentication or OAuth 2.0. Use role-based authorization to restrict access to specific endpoints.
* **Asynchronous Operations and Performance Optimization:**
    * **Why:** Optimize the API for performance by using asynchronous operations and implementing caching strategies. This improves the API's responsiveness and scalability.
    * **How:** Use `async` and `await` keywords for all I/O-bound operations. Implement caching using in-memory caches or distributed caches like Redis.
* **Detailed Logging and Monitoring:**
    * **Why:** Implement detailed logging and monitoring to track API usage, identify performance bottlenecks, and diagnose errors. This improves the API's maintainability and reliability.
    * **How:** Use a logging framework like Serilog or NLog. Implement monitoring using tools like Application Insights or Prometheus.
* **Automated Testing Improvements:**
    * **Why:** Add more integration and end to end tests to the test suite. Increase code coverage to ensure that all critical paths are tested.
    * **How:** Create more test cases that simulate real world scenarios. Implement end to end tests that test the entire api workflow.
* **Health Checks:**
    * **Why:** Implement health checks to monitor the API's health and availability. This allows for proactive monitoring and early detection of issues.
    * **How:** Use the `Microsoft.AspNetCore.Diagnostics.HealthChecks` package.

These improvements will contribute to a more robust, maintainable, and user-friendly Stock Control API.

## Technologies and Packages

* **.NET 9:** The core framework for the API.
* **ASP.NET Core Web API:** Used to build the RESTful API.
* **Entity Framework Core (EF Core):**
    * `Microsoft.EntityFrameworkCore.SqlServer`: Database provider for SQL Server.
    * `Microsoft.EntityFrameworkCore.Tools`: EF Core tools for migrations.
    * `Microsoft.EntityFrameworkCore.Design`: Design-time services for EF Core.
* **MediatR:** Used for implementing the mediator pattern.
    * `MediatR`: Mediator implementation.
* **Swashbuckle.AspNetCore:** Used for generating Swagger/OpenAPI documentation.
* **System.Text.Json:** Used for JSON serialization with `ReferenceHandler.Preserve` to handle circular references.
* **xUnit:** Used for unit testing (structure is setup, but tests are not fully implemented).

## Project Structure
StockControl/
├── src/
│   ├── Application/
│   │   ├── Commands/
│   │   ├── Queries/
│   │   ├── DTOs/
│   │   └── Interfaces/
│   ├── Domain/
│   │   ├── Entities/
│   │   └── Interfaces/
│   ├── Infrastructure/
│   │   ├── Data/
│   │   │   └── Migrations/
│   │   ├── Repositories/
│   │   └── Extensions/
│   └── Api/
│       ├── Controllers/
│       └── Models/
├── tests/
│   ├── StockControl.Api.Tests/
│   └── StockControl.Application.Tests/
└── StockControl.sln

## Setup and Running

1.  **Clone the repository.**
2.  **Install .NET 9 SDK.**
3.  **Configure the database connection string** in `appsettings.json`.
4.  **Run EF Core migrations:** `dotnet ef database update -p src/Infrastructure -s src/Api`
5.  **Run the API:** `dotnet run --project src/Api`
6.  **Access the Swagger UI:** `https://localhost:<port>/swagger`

## Initial Products

After running the initial migration, the following products are added to the database:

| Name                | Code         |
|---------------------|--------------|
| Whey Protein 1kg    | WHEY1KG      |
| Creatine 300g       | CREATINE300G |
| BCAA 250g           | BCAA250G     |
| Multivitamin 60caps | MULTI60CAPS  |
| Shaker Bottle       | SHAKER       |