const mongoose = require("mongoose");
const express = require("express");

// Load the env variable.
require('dotenv').config();

// Important links and URL.
const DB_URL = process.env.DB_URL;

// Constants
const PORT = 3000;
const HOST = "localhost";

// Setup
const app = express();
app.use(express.json());

// Once
const OPTIONS = {
    family: 4 // Use IPv4, skip trying IPv6
}

// connect to DB.
mongoose.connect(DB_URL, OPTIONS).then(function (connection) {
    // console.log("Connected to MongoDB: ", connection);
    console.log("Successfuly Connected to MongoDB!!");
}).catch(function (err) {
    console.log("Error while connecting with DB need urget attention: ", err);
});

/**
   "product_name":"iPhone 19",
   "product_price":"$2000",
   "isInStock":true,
   "category":"Phone",
   "password":"123456789",
   "confirmPassword":"123456789"
 */

// Create a Schema.
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirm_password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function () {
                return this.password === this.confirm_password;
            },
            message: "Password and confirm password should be same."
        }
    },
});

// const product.
const productModel = mongoose.model("Products", productSchema);


app.post('/api/products', async function (req, res) {
    const body = req.body;
    console.log("Body: ", body);

    try {
        const product = await productModel.create({
            category: body.category,
            product_name: body.product_name,
            product_price: body.product_price,
            isInStock: body.isInStock,
            password: body.password,
            confirm_password: body.confirmPassword
        });

        console.log("Products: ", product);
        return res.status(200).json({ message: "Product created successfully!!!" });
    } catch (err) {
        console.log("Error in post req at path: /api/products: ", err);
        return res.status(200).json({ message: err.message });
    }
});

app.get("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findById(id);
    res.status(200).json(product);
});

app.get("/api/products", async function (req, res) {
    const allProducts = await productModel.find();
    // const allProducts = await productModel.find({ category: "TV" });

    console.log("all products: ", allProducts);
    return res.status(201).json(allProducts);
});

app.patch("/api/products/:id", async (req, res) => {
    await productModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Product updated successfully" });
});

app.delete("/api/products/:id", async (req, res) => {
    await productModel.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({ message: "Product Deleted successfully" });
});



// start the server
app.listen(PORT, () => {
    console.log(`server is running on http://${HOST}:${PORT}`);
});
