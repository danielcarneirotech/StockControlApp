# Fitshop Stock Control UI

Hi there! 👋
Welcome to our project!
This is our README.md file with general information about the project. If you want to go deeper about our development & team best practices and architecture, please check our [Documentation Folder](../Documentation/).

## Key Topics

- **[Project Overview](#overview)**
- **[Project Architecture](#project-architecture)**
- **[Key Features](#key-features)**
- **[Technologies Used](#technologies-used)**
- **[Getting Started](#getting-started)**
- **[Testing](#testing)**
- **[Next Steps & Technical Improvements](#next-steps--technical-improvements)**
- **[AI Disclaimer](#ai-disclaimer)**

## Overview

Fitshop Stock System is a web application designed to manage stock transactions and generate stock reports for fitness products. This project is built using React, TypeScript, and Vite, providing a modern and efficient development environment.

## Project Architecture

The project follows a component-based architecture with a clear separation of concerns that should be followed by the team. It's not fully implemented, but that's our goal "to be" right now:

Understand it better at [Best Practices](../Documentation/UI/BEST_PRACTICES.md)

![Frontend Architecture](../Documentation/UI/Pictures/frontend-architecture.png)

## Key Features

- **Add Stock Transactions**: Easily add new stock transactions, including check-ins and check-outs.
- **Generate Stock Reports**: View stock levels for products on a specific date.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool and development server for modern web projects.
- **Bootstrap**: A popular CSS framework for responsive and mobile-first web development.
- **Date-fns**: A modern JavaScript date utility library.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/danielcarneirotech/StockControlApp
   cd StockControl/StockControl-UI
   ```

2. **Install NodeJS**

- https://nodejs.org/en

3. **Install dependencies**:

   ```sh
   npm install
   ```

4. **Run the development server**:

   ```sh
   npm run dev
   ```

**Build the project**:

```sh
npm run build
```

**Run tests**:

```sh
npm test
```

**Run linting**:

```sh
npm run lint
```

**Run formatting**:

```sh
npm run format
```

**Preview the build**:

```sh
npm run preview
```

**Scan for vulnerabilities**:

```sh
npm audit
```

## Testing

This project utilizes Jest and React Testing Library for comprehensive testing. Here's a quick overview of our testing strategy:

### Test Suites

- **Unit Tests:** We employ unit tests to isolate and verify the functionality of individual components, services, and utility functions.
- **Component Tests:** React components are tested using React Testing Library to ensure they render correctly and respond to user interactions as expected.
- **Service Tests:** Service modules, particularly those interacting with APIs, are thoroughly tested to validate data handling, error management, and API request correctness.
- **Utility Tests:** Utility functions are tested to confirm their expected behavior across various inputs, including edge cases.

### Running Tests

To execute the test suite, use the following command:

```bash
npm test
# or
yarn test
```

## Next Steps & Technical Improvements

- **State Management:** Implement Redux Toolkit for centralized state, improving maintainability.
- **Component Library/Design System (Storybook):** Build a reusable UI component library for consistent UI and faster development.
- **E2E Testing (Cypress/Playwright):** Add end-to-end tests for user flow validation and integration testing.
- **Performance Optimization:** Implement code splitting, lazy loading, and memoization to improve app performance. Also, use tanstack query for data fetching and caching.
- **CI/CD Enhancements:** Automate linting, testing, and deployment for faster, reliable releases.
- **Accessibility (a11y):** Improve accessibility with semantic HTML, ARIA attributes, and screen reader testing.

## AI Disclaimer

This project was developed with the assistance of artificial intelligence tools, specifically GitHub Copilot. While AI has been instrumental in generating code suggestions, assisting with repetitive tasks, and providing insights during the development process, it's important to understand the following:

- **Human Oversight:** All AI-generated code has been reviewed and modified by me (Daniel Carneiro). The final implementation reflects my understanding and adherence to best practices.
- **AI as a Tool:** AI was used as a tool to enhance productivity, not as a replacement for human expertise. It was used for:
  - First design idea
  - Providing code suggestions
  - Assisting with documentation
  - Offering insights on best practices
- **Responsibility:** I retain full responsibility for the code and functionality of this project.
- **No Sensitive Data:** During the development process, no sensitive information or proprietary data was directly inputted into or generated by the AI tools used.

I acknowledge the role of AI in this project and are committed to transparency regarding its use. I encourage users and reviewers to report any issues or concerns regarding the code, and we will continue to strive for the highest standards of quality and reliability.

For any questions or more information, contact me at [https://www.linkedin.com/in/danielcarneirotech/]
