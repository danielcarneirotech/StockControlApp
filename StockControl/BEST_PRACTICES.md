# StockControlApp - Backend Best Practices

This document outlines the best practices to be followed during the development of the StockControlApp backend project. Adhering to these guidelines ensures code quality, maintainability, performance, and team collaboration.

## Contact Information

- **Name**: Daniel Carneiro
- **Company**: Accruent
- **Contact**: [daniel.carneiro@accruent.com](mailto:daniel.carneiro@accruent.com)

  ## Table of Contents

- [Project Structure & Layer Responsibilities](#project-structure--layer-responsibilities)
  - [src/](#src)
    - [Api/]
    - [Application/]
    - [Domain/]
    - [Infrastructure/]
    - [StockControl.Shared/]
  - [tests/](#tests)
    - [StockControl.Api.Tests/]
    - [StockControl.Application.Tests/]
- [Testing](#testing)
- [Dependencies & Dependency Management](#dependencies--dependency-management)
- [Code Quality & Architecture](#code-quality--architecture)
- [Team Productivity & Collaboration](#team-productivity--collaboration)
- [Environment Variables & Configuration](#environment-variables--configuration)
- [Timezone Handling](#timezone-handling)
- [API Documentation](#api-documentation)

## Project Structure & Layer Responsibilities

The project follows a Clean Architecture with Domain-Driven Design (DDD) principles, organized into distinct layers to separate concerns:

**`src/`**: Main Source Directory

- **`Api/`**:
  - **Responsibility**: Handles HTTP requests, routing, serialization/deserialization, and API-specific logic.
  - **Best Practices**:
    - Keep controllers thin, delegating business logic to the Application layer.
    - Use DTOs for request/response payloads.
    - Implement robust input validation and error handling.
    - Keep Swagger/OpenAPI complete and useful.
- **`Application/`**:
  - **Responsibility**: Contains application-specific logic, commands, queries, and DTOs. Acts as the orchestration layer between the API and Domain.
  - **Best Practices**:
    - Use MediatR for command/query handling.
    - Implement business logic using commands and queries.
    - Define DTOs for data transfer.
    - Implement validation using FluentValidation (or data annotations where appropriate).
    - Implement Timezone handling correctly, and keep all dates in UTC.
- **`Domain/`**:
  - **Responsibility**: Holds core business logic and entities.
  - **Best Practices**:
    - Focus on business rules and domain models.
    - Keep entities pure and free of infrastructure concerns.
    - Implement domain-driven design principles such as Aggregates, Value Objects, and Domain Events.
- **`Infrastructure/`**:
  - **Responsibility**: Manages external dependencies like database access and repositories.
  - **Best Practices**:
    - Use Entity Framework Core (EF Core) for database interactions.
    - Implement the Repository pattern for data access.
    - Use EF Core migrations for database schema management.
    - Keep database context and repository implementations separate.
- **`StockControl.Shared/`**:
  - **Responsibility**: Contains shared DTOs and other resources.
  - **Best Practices**:
    - Place reusable DTOs and utility classes here.

**`tests/`**: Test files.

- **`StockControl.Api.Tests/`**: Tests for the API layer.
- **`StockControl.Application.Tests/`**: Tests for the application layer.

## Testing

- **Coverage Goals**: Aim for 90%+ code coverage (statement, branch, function, line).
- **Testing Framework**: xUnit for unit and integration tests.
- **Mocking**: Moq for mocking external dependencies.
- **Test Organization**: Follow a similar project structure for test files.
- **Test Scenarios**: Cover all positive and negative scenarios, including edge cases and error handling.
- **Integration Tests**: Test the interaction between different layers (e.g., Application and Infrastructure).
- **End-to-End Tests**: Verify the complete application flow.

## Dependencies & Dependency Management

- **.NET 9**: Utilize the latest .NET features and performance improvements.
- **ASP.NET Core Web API**: Build a robust RESTful API.
- **Entity Framework Core (EF Core)**:
  - Use `Microsoft.EntityFrameworkCore.SqlServer` for SQL Server integration.
  - Utilize `Microsoft.EntityFrameworkCore.Tools` and `Microsoft.EntityFrameworkCore.Design` for migrations and design-time services.
- **MediatR**: Decouple request handling using the Mediator pattern.
- **Swashbuckle.AspNetCore**: Generate interactive API documentation.
- **System.Text.Json**: Handle JSON serialization efficiently.
- **xUnit**: Write comprehensive unit and integration tests.
- **Security**: Regularly audit dependencies for vulnerabilities (`dotnet list package --vulnerable`).
- **Version Control**: Pin dependencies to specific versions to prevent unexpected issues.

## Code Quality & Architecture

- **SOLID Principles**: Adhere to SOLID principles for maintainable and scalable code.
- **Design Patterns**: Employ patterns like Repository', Mediator, and Dependency Injection.
- **Clean Architecture**: Ensure a clear separation of concerns between layers.
- **Code Formatting & Linting**: Use Prettier and ESLint (if applicable) for consistent code style.
- **Error Handling**: Implement comprehensive error handling and logging.
- **Timezone Handling**: Always store and process dates in UTC.
- **Logging & Monitoring**: Implement logging (Serilog, NLog) and monitoring (Application Insights, Prometheus) for production.
- **Health Checks**: Implement health checks to monitor application availability.

## Team Productivity & Collaboration

- **Onboarding**: Provide clear onboarding documentation and setup instructions.
- **Code Reviews**: Conduct thorough code reviews to ensure quality and knowledge sharing.
- **Pair Programming**: Use pair programming for complex tasks or knowledge transfer.
- **Communication**: Maintain clear and consistent communication.
- **Agile Practices**: Follow agile methodologies for project management.
- **CI/CD**: Implement CI/CD pipelines for automated testing and deployment.
- **Documentation**: Maintain up-to-date documentation in Confluence.

## Environment Variables & Configuration

- **`appsettings.json`**: Store configuration settings in `appsettings.json`.
- **Security**: Avoid committing sensitive information to version control.
- **Naming Conventions**: Use clear and consistent naming conventions for environment variables.

## Timezone Handling

- **UTC Storage**: Store all dates and times in the database in UTC.
- **Conversion**: Convert dates between UTC and local timezones (e.g., BRT) in the Application layer.
- **Testing**: Implement tests to validate correct date conversion and storage.

## API Documentation

- **Swagger/OpenAPI**: Use Swagger/OpenAPI to generate interactive API documentation.
- **Examples**: Provide request and response examples.
- **Additional Documentation**: Include architecture diagrams and endpoint details.

## Contact Information

For any questions or information, contact team lead Daniel Carneiro.
