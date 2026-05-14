import { model, Schema } from "mongoose";

// Define the Product schema with validation rules
const productSchema = new Schema({
    productId: {
        type: Number,
        required: [true, "Product ID is required"]
    },
    productName: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [10000, "Minimum price is 10000"],
        max: [50000, "Maximum price is 50000"]
    }, 
    brand: {
        type: String,
        required: [true, "Brand name is required"]
    }
});

// Create and export the Product model
export const ProductModel = model("product", productSchema);
