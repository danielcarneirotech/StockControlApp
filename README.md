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
    * Initial product data seeding.
* **Transaction Management:**
    * Add check-in and check-out transactions.
    * Prevent negative stock levels.
    * Validate product codes.
* **API Documentation:**
    * Swagger/OpenAPI for API documentation and testing.

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
│   │   ├── DTOs/
│   │   └── Interfaces/
│   ├── Domain/
│   │   ├── Entities/
│   │   └── Interfaces/
│   ├── Infrastructure/
│   │   ├── Data/
│   │   ├── Repositories/
│   └── Api/
│       ├── Controllers/
│       └── Models/
├── tests/
│   ├── Application.Tests/
│   ├── Domain.Tests/
│   └── Infrastructure.Tests/
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