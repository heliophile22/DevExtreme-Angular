# Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




## About POC

It is a proof-of-concept (POC) project for managing categories, subcategories, and expenses via an interactive and user-friendly dashboard. The project is designed with a modular structure, separating backend APIs and the frontend user interface to ensure scalability and maintainability.


## Features

- **Category Management**:
  - Add, edit, and delete categories with ease.
  - View category details in a structured grid format.

- **Subcategory Management**:
  - Manage subcategories linked to their respective categories.
  - Quickly fetch subcategories based on a specific category.

- **Expense Tracking**:
  - Record expenses with fields like amount, date, category, and subcategory.
  - View expenses in a paginated table for easy tracking.

- **Interactive UI**:
  - Built using Angular with a responsive design.
  - Includes confirmation popups and toast notifications for feedback.

- **Lookup and Filtering**:
  - Leverage category and subcategory lookups to maintain data integrity.
  - Filter subcategories dynamically based on selected categories.


## Folder Structure

- **API**:
  - Contains all RESTful API logic for managing categories, subcategories, and expenses.
  - Uses .NET Core for robust API development.
  - Follows a clean architecture pattern for maintainability.

- **Frontend**:
  - Angular-based user interface with modular components.
  - Implements DevExtreme grids, forms, and popups for an intuitive user experience.


## Category APIs
- `GET /api/Category`: Fetch all categories.
- `GET /api/Category/{id}`: Fetch a specific category by ID.
- `POST /api/Category`: Add a new category.
- `PUT /api/Category/{id}`: Update an existing category.
- `DELETE /api/Category/{id}`: Delete a category.

## SubCategory APIs
- `GET /api/SubCategory`: Fetch all subcategories.
- `GET /api/SubCategory/{id}`: Fetch a specific subcategory by ID.
- `POST /api/SubCategory`: Add a new subcategory.
- `PUT /api/SubCategory/{id}`: Update an existing subcategory.
- `DELETE /api/SubCategory/{id}`: Delete a subcategory.
- `GET /api/SubCategory/ByCategory/{categoryId}`: Get subcategories by category.

## Expense APIs
- `GET /api/Expense`: Fetch all expenses.
- `GET /api/Expense/{id}`: Fetch a specific expense by ID.
- `POST /api/Expense`: Add a new expense.
- `PUT /api/Expense/{id}`: Update an existing expense.
- `DELETE /api/Expense/{id}`: Delete an expense.