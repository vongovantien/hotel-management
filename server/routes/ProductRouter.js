const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel.js");

const productRoute = express.Router();

productRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.json(products);
    })
);
productRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.status(200).json(product);
        } else {
            res.status(404);
            throw new Error("Product not found !!");
        }
    })
);

module.exports = productRoute;
