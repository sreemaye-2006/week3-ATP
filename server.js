import exp from 'express';
import { connect } from 'mongoose';
import { productApp } from "./API/productAPI.js";
import cookieParser from 'cookie-parser';

const app = exp();

// Add body parser middleware to read JSON from requests
app.use(exp.json());

// Add cookie parser middleware
app.use(cookieParser());

// Forward requests starting with /product-api to the product router
app.use('/product-api', productApp);

// Function to connect to the MongoDB database and start the server
async function connectDB() {
    try {
        await connect("mongodb://localhost:27017/anuragdb");
        console.log("Database connection successful.");
        app.listen(4000, () => console.log("Server listening on port 4000..."));
    } catch (err) {
        console.log("Error in database connection:", err);
    }
}

// Initialize database connection
connectDB();

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Validation Error", error: err.message });
    }
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Cast Error", error: err.message });
    }
    res.status(500).json({ message: "Server error occurred", error: err.message });
});