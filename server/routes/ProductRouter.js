const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel.js");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const productController = require("../controllers/ProductController.js");
const productRoute = express.Router();
const protect = require("../middleware/AuthMiddleware.js");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Products",
    },
});
var upload = multer({ storage: storage });

productRoute
    .route("/:id/review")
    .post(protect, productController.addProductReview);

productRoute
    .route("/:id")
    .get(productController.getProductById)
    .put(protect, productController.updateProduct)
    .delete(productController.deleteProduct);

productRoute
    .route("/")
    .get(productController.getProducts)
    .post(upload.single("image"), productController.addProduct);

module.exports = productRoute;
