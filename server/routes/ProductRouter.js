const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel.js");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const productController = require("../controllers/ProductController.js");
const productRouter = express.Router();
const protect = require("../middleware/AuthMiddleware.js");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Products",
    },
});

var upload = multer({ storage: storage });

productRouter.get("/", productController.getAllProducts)

productRouter.post("/:id/reviews", protect, productController.addProductReview);
productRouter.get("/:id", productController.getProductById)
productRouter.put("/:id", productController.updateProduct)
productRouter.delete("/:id", productController.deleteProduct);
productRouter.post("/upload", upload.single("image"), productController.addProduct);


module.exports = productRouter;
