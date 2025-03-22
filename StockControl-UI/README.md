# Fitshop Stock System

## Contact Information

- **Name**: Daniel Carneiro
- **Company**: Accruent
- **Contact**: [daniel.carneiro@accruent.com](mailto:daniel.carneiro@accruent.com)

## Here's a quick overview of the key topics covered in this README:

* **Contact Information:**
* **Project Overview:**
* **Key Features:**
* **Technologies Used:**
* **Getting Started:**
* **Testing:**

## Overview

Fitshop Stock System is a web application designed to manage stock transactions and generate stock reports for fitness products. This project is built using React, TypeScript, and Vite, providing a modern and efficient development environment.

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
   git clone https://github.com/your-repo/fitshop-stock-system.git
   cd fitshop-stock-system
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:

   ```sh
   npm run dev
   ```

4. **Build the project**:

   ```sh
   npm run build
   ```

5. **Preview the build**:
   ```sh
   npm run preview
   ```
## Testing

This project utilizes Jest and React Testing Library for comprehensive testing. Here's a quick overview of our testing strategy:

### Test Suites

* **Unit Tests:** We employ unit tests to isolate and verify the functionality of individual components, services, and utility functions.
* **Component Tests:** React components are tested using React Testing Library to ensure they render correctly and respond to user interactions as expected.
* **Service Tests:** Service modules, particularly those interacting with APIs, are thoroughly tested to validate data handling, error management, and API request correctness.
* **Utility Tests:** Utility functions are tested to confirm their expected behavior across various inputs, including edge cases.

### Running Tests

To execute the test suite, use the following command:

```bash
npm test
# or
yarn test
```

## Next Steps & Improvements

* **State Management:** Implement Redux Toolkit or Zustand for centralized state, improving maintainability.
* **Component Library/Design System (Storybook):** Build a reusable UI component library for consistent UI and faster development.
* **E2E Testing (Cypress/Playwright):** Add end-to-end tests for user flow validation and integration testing.
* **Performance Optimization:** Implement code splitting, lazy loading, and memoization to improve app performance.
* **CI/CD Enhancements:** Automate linting, testing, and deployment for faster, reliable releases.
* **Accessibility (a11y):** Improve accessibility with semantic HTML, ARIA attributes, and screen reader testing.