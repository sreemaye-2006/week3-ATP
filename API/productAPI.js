import exp from 'express';
import { ProductModel } from '../models/productModel.js';

export const productApp = exp.Router();
 
// 1. Create a new product
productApp.post("/product", async (req, res, next) => {
    try {
        const newProduct = req.body;
        const newProductDocument = new ProductModel(newProduct);
        const result = await newProductDocument.save();
        res.status(201).json({ message: "Product created successfully", payload: result });
    } catch(err) {
        next(err); // Pass error to global error handler
    }
});

// 2. Read all products
productApp.get("/product", async (req, res, next) => {
    try {
        let productList = await ProductModel.find();
        res.status(200).json({ message: "List of products", payload: productList });
    } catch(err) {
        next(err);
    }
});

// 3. Read a specific product by ID
productApp.get("/product/:productId", async (req, res, next) => {
    try {
        const uid = req.params.productId;
        const productObj = await ProductModel.findById(uid);
        if (!productObj) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product found", payload: productObj });
    } catch(err) {
        next(err);
    }
});

// 4. Update a product by ID
productApp.put("/product/:productId", async (req, res, next) => {
    try {
        const modifiedProduct = req.body;
        const uid = req.params.productId; 
        
        const updateProduct = await ProductModel.findByIdAndUpdate(
            uid, 
            { $set: { ...modifiedProduct } },
            { new: true, runValidators: true }
        );
        
        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product modified", payload: updateProduct });
    } catch(err) {
        next(err);
    }
});

// 5. Delete a product by ID
productApp.delete("/product/:productId", async (req, res, next) => {
    try {
        const uid = req.params.productId; 
        const deletedProduct = await ProductModel.findByIdAndDelete(uid);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted", payload: deletedProduct });
    } catch(err) {
        next(err);
    }
});
