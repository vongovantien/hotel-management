const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel.js");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const productController = require("../controllers/productController.js");
const productRoute = express.Router();
const protect = require("../middleware/AuthMiddleware.js");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Products",
    },
});

var upload = multer({ storage: storage });
    /**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: number
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */

productRoute
    .route("/:id/review")
    /**
 * @swagger
 * /api/products:
 *  post:
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 */
    .post(protect, productController.addProductReview);

productRoute
    .route("/:id")
    /**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 */
    .get(productController.getProductById)
    /**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 */
    .put(protect, productController.updateProduct)
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 */
    .delete(productController.deleteProduct);
productRoute
    .route("/")
/**
 * @swagger
 * /api/products/getAllProducts:
 *  get:
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Success
 */
    .get(productController.getAllProducts)
/**
 * @swagger
 * /api/products:
 *  post:
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Success
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - isAdmin
 *              - createdAt
 *              - updatedAt
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *              isAdmin:
 *                type: boolean
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 */
    .post(upload.single("image"), productController.addProduct);

module.exports = productRoute;
