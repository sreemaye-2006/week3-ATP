# Week 3 - Minimal Backend

This repository contains a minimal backend application using Node.js, Express, and MongoDB (Mongoose).

## Directory Structure

The project has been organized into a standard Express MVC (Model-View-Controller) pattern for better maintainability:

- **`models/`**: Contains Mongoose data models.
  - `productModel.js`: Defines the schema and validation for products.
- **`API/`**: Contains the Express route handlers (Controllers).
  - `productAPI.js`: Implements the CRUD operations (Create, Read, Update, Delete) for products.
- **`middleware/`**: Contains custom Express middleware.
  - `verifyToken.js`: Middleware for JWT authentication using cookies.
- **`server.js`**: The main entry point of the application. It connects to the MongoDB database and registers the API routes.
- **`req.http`**: A test file for making HTTP requests (typically used with the REST Client VS Code extension).

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure you have MongoDB running locally on `localhost:27017`.

3. Start the server:
   ```bash
   npm start
   # or
   node server.js
   ```

## Features
- **Database Connection**: Connects to a local MongoDB instance.
- **Error Handling**: Uses a global error-handling middleware to catch `ValidationError` and `CastError`.
- **JWT Verification**: Includes a middleware template for securing routes.
