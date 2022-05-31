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

/**
 * @swagger
 * /api/products/getAllProducts:
 *  get:
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Success
 */
productRouter.get("/getAllProducts", productController.getAllProducts)

/**
 * @swagger
 * /api/products/{id}/reviews:
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
productRouter.post("/:id/reviews", protect, productController.addProductReview);

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

productRouter.get("/:id", productController.getProductById)

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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *              - rating
 *              - numReviews
 *              - price
 *              - countInStock
 *              - reviews
 *              - createdAt
 *              - updatedAt
 *            properties:
 *              name:
 *                type: string
 *              image:
 *                type: string
 *                format: binary
 *              rating:
 *                type: number
 *              numReviews:
 *                type: boolean
 *              price:
 *                type: number
 *              countInStock:
 *                type: number
 *              reviews:
 *                type: array
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 */
productRouter.put("/:id", productController.updateProduct)
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
productRouter.delete("/:id", productController.deleteProduct);

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
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *              - price
 *              - countInStock
 *            properties:
 *              name:
 *                type: string
 *              image:
 *                type: string
 *                format: binary
 *              rating:
 *                type: number
 *              numReviews:
 *                type: number
 *              price:
 *                type: number
 *              countInStock:
 *                type: number
 *              reviews:
 *                type: array
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 */
productRouter.post(upload.single("image"), productController.addProduct);

module.exports = productRouter;
