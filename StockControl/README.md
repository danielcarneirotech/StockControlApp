# Fitshop Stock Control API

This is our README.md file with general information about the project. If you want to go deeper about our development & team best practices and architecture, please check our [Best Practices Guide](../Documentation/API/BEST_PRACTICES.md).

## Key Topics

- [**Project Overview**](#project-overview)
- [**Architecture**](#architecture)
- [**Database**](#database)
- [**Features**](#features)
- [**Testing**](#testing)
- [**Future Technical Improvements**](#future-technical-improvements)
- [**Technologies and Packages**](#technologies-and-packages)
- [**Project Structure**](#project-structure)
- [**Setup and Running**](#setup-and-running)
- [**CORS Configuration**](#cors-configuration)
- [**Initial Products**](#initial-products)

## Project Overview

This project is a RESTful API designed for managing stock control for a fitness shop. It provides endpoints to manage products and their transactions (check-ins and check-outs). The API ensures data integrity by preventing negative stock levels and validating product codes.

## Architecture

The project follows a Clean Architecture approach with Domain-Driven Design (DDD) principles. It is structured into distinct layers to separate concerns and improve maintainability:

![Architecture Diagram](../Documentation/API/Pictures/backend-architecture.png)

- **Api:** The entry point for HTTP requests, handling routing and middleware.
- **Application:** Handles application-specific logic, commands, queries, and DTOs.
- **Domain:** Contains core business logic and entities.
- **Infrastructure:** Manages external dependencies like database access and repositories.
- **Shared:** Contains shared DTOs and other shared resources.
- **Tests:** Contains unit and integration tests for the application.

### Design Patterns

- **Repository Pattern:** Used to abstract data access and provide a consistent interface for interacting with the database.
- **Mediator Pattern (via MediatR):** Decouples request handling from the controllers, promoting a clean and maintainable codebase.
- **Command/Query Responsibility Segregation (CQRS):** While not fully implemented, the project structure is designed to support CQRS, with commands for write operations and queries for read operations.
- **Dependency Injection (DI):** Used extensively to manage dependencies and promote loose coupling.

## Database

![Database Diagram](../Documentation/API/Pictures/database-architecture.png)

- **SQL Server:** Used as the relational database to persist product and transaction data.
- **Entity Framework Core (EF Core):** Used as the ORM to interact with the database.
- **Migrations:** EF Core migrations are used to manage database schema changes.
- Initial data for products is seeded through migrations.

## Features

- **Product Management:**
  - Initial product data seeding for development and testing.
- **Transaction Management:**
  - Add check-in transactions to increase stock levels.
  - Add check-out transactions to decrease stock levels.
  - Prevent transactions that would result in negative stock levels.
  - Validate product codes against existing products.
- **Stock Reporting:**
  - Generate comprehensive stock reports showing current stock levels for all products with filter by date and product code.
- **API Documentation:**
  - Swagger/OpenAPI for interactive API documentation and testing.

## Testing

This project includes comprehensive unit and integration tests to ensure the reliability and correctness of the Stock Control application.

### Unit Tests

We use xUnit as the testing framework and Moq for mocking dependencies.

**Key Test Areas:**

- **Adding Transactions:** Tests cover adding check-in and check-out transactions, including validation for sufficient stock levels and handling of invalid product codes.
- **Retrieving Stock Reports:** Tests ensure that stock reports are generated accurately, including calculations of current stock levels.

## Future Technical Improvements

This section outlines potential enhancements and improvements that can be made to the Stock Control API to further enhance its functionality, robustness, and user experience.

- **API Versioning:**
  - **Why:** Implement API versioning to allow for backward-compatible changes and to support multiple versions of the API simultaneously. This ensures that clients are not affected by breaking changes.
  - **How:** Use URL-based versioning (e.g., `/v1/products`) or header-based versioning (e.g., `Accept: application/vnd.stockcontrol.v2+json`).
- **Authentication and Authorization:**
  - **Why:** Add authentication and authorization to secure the API and control access to sensitive data. This ensures that only authorized users can perform certain actions.
  - **How:** Implement JWT authentication or OAuth 2.0. Use role-based authorization to restrict access to specific endpoints.
- **Asynchronous Operations and Performance Optimization:**
  - **Why:** Optimize the API for performance implementing caching strategies. This improves the API's responsiveness and scalability.
  - **How:** Implement caching using in-memory caches or distributed caches like Redis.
- **Detailed Logging and Monitoring:**
  - **Why:** Implement detailed logging and monitoring to track API usage, identify performance bottlenecks, and diagnose errors. This improves the API's maintainability and reliability.
  - **How:** Use a logging framework like Serilog or NLog. Implement monitoring using tools like Application Elasticsearch, Kibana, Grafana.
- **Automated Testing Improvements:**
  - **Why:** Add more integration and end to end tests to the test suite. Increase code coverage to ensure that all critical paths are tested.
  - **How:** Create more test cases that simulate real world scenarios. Implement end to end tests that test the entire api workflow.
- **Health Checks:**
  - **Why:** Implement health checks to monitor the API's health and availability. This allows for proactive monitoring and early detection of issues.
  - **How:** Use the `Microsoft.AspNetCore.Diagnostics.HealthChecks` package.

These improvements will contribute to a more robust, maintainable, and user-friendly Stock Control API.

## Technologies and Packages

- **.NET 9:** The core framework for the API.
- **ASP.NET Core Web API:** Used to build the RESTful API.
- **Entity Framework Core (EF Core):**
  - `Microsoft.EntityFrameworkCore.SqlServer`: Database provider for SQL Server.
  - `Microsoft.EntityFrameworkCore.Tools`: EF Core tools for migrations.
  - `Microsoft.EntityFrameworkCore.Design`: Design-time services for EF Core.
- **MediatR:** Used for implementing the mediator pattern.
  - `MediatR`: Mediator implementation.
- **Swashbuckle.AspNetCore:** Used for generating Swagger/OpenAPI documentation.
- **System.Text.Json:** Used for JSON serialization with `ReferenceHandler.Preserve` to handle circular references.
- **xUnit:** Used for unit testing (structure is setup, but tests are not fully implemented).

## Setup and Running

1.  **Clone the repository.**
2.  **Install .NET 9 SDK.**
3.  **Install SQL Server**
4.  **Check the database connection string** in `src\api\appsettings.json`.
5.  **Run restore on `\StockControl` to Download project dependencies**

```sh
dotnet restore
```

6.  **Instal EF Core Tools**

```sh
dotnet tool install --global dotnet-ef
```

4.  **Run EF Core migrations:**

```sh
dotnet ef database update -p src/Infrastructure -s src/Api
```

5.  **Run the API:**

```sh
dotnet run --project src/Api
```

6.  **Access the Swagger UI:** `http://localhost:5172/swagger/index.html`

## CORS Configuration

This application utilizes Cross-Origin Resource Sharing (CORS) to allow the ReactJS frontend (running on a different origin) to communicate with the API backend.

**Important:** To run this application locally or deploy it to a different environment, you must ensure that the CORS configuration in the API backend matches the origin of your ReactJS frontend.

**Local Development:**

During local development, the ReactJS frontend typically runs on `http://localhost:5173`, and the API backend runs on `http://localhost:5172`. If you are using these default ports, no changes are required.

**Custom Ports or Environments:**

If you are using different ports or deploying the frontend to a different domain, you must update the CORS configuration here.

**Troubleshooting:**

If you encounter CORS errors, ensure that:

- The origin in your API's CORS configuration matches the origin of your ReactJS frontend.
- The API server is running with the updated configuration.
- Your browser's cache is cleared.

By correctly configuring CORS, you will enable seamless communication between your ReactJS frontend and your API backend.

## Initial Products

After running the initial migration, the following products are added to the database:

| Name                | Code         |
| ------------------- | ------------ |
| Whey Protein 1kg    | WHEY1KG      |
| Creatine 300g       | CREATINE300G |
| BCAA 250g           | BCAA250G     |
| Multivitamin 60caps | MULTI60CAPS  |
| Shaker Bottle       | SHAKER       |

## AI Disclaimer

This project was developed with the assistance of artificial intelligence tools, specifically GitHub Copilot. While AI has been instrumental in generating code suggestions, assisting with repetitive tasks, and providing insights during the development process, it's important to understand the following:

- **Human Oversight:** All AI-generated code has been reviewed and modified by me (Daniel Carneiro). The final implementation reflects my understanding and adherence to best practices.
- **AI as a Tool:** AI was used as a tool to enhance productivity, not as a replacement for human expertise. It was used for:
  - Generating boilerplate code
  - Providing code suggestions
  - Assisting with documentation
  - Offering insights on best practices
- **Responsibility:** I retain full responsibility for the code and functionality of this project.
- **No Sensitive Data:** During the development process, no sensitive information or proprietary data was directly inputted into or generated by the AI tools used.

I acknowledge the role of AI in this project and are committed to transparency regarding its use. I encourage users and reviewers to report any issues or concerns regarding the code, and we will continue to strive for the highest standards of quality and reliability.

For any questions or more information, contact me at [https://www.linkedin.com/in/danielcarneirotech/]
