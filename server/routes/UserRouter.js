const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/AuthMiddleware.js");
const userRouter = express.Router();
const nodemailer = require("nodemailer");
const userController = require("../controllers/UserController");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
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
 * /api/users/getAllUsers:
 *  get:
 *    tags: [User]
 *    parameters:
 *     - in: query
 *       name: perPage
 *       schema:
 *         type: string
 *     - in: query
 *       name: page
 *       schema:
 *         type: string
 *     - in: query
 *       name: filter
 *       schema:
 *         type: string
 *    responses:
 *      200:
 *        description: Success
 */

userRouter.get("/getAllUsers", userController.getAllUsers);

/**
 * @swagger
 * /api/users/profile/{id}:
 *  get:
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 */
userRouter.get("/profile/:id", userController.profile);
/**
 * @swagger
 * /api/users/register:
 *  post:
 *    tags: [Authenticate]
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
userRouter.post("/register", asyncHandler(userController.register));
/**
 * @swagger
 * /api/users/login:
 *  post:
 *    tags: [Authenticate]
 *    responses:
 *      200:
 *        description: Success
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 */
userRouter.post("/login", userController.login);

/**
 * @swagger
 * /api/users/forgotPassword:
 *  post:
 *    tags: [Authenticate]
 *    responses:
 *      200:
 *        description: Success
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 */
userRouter.post("/forgotPassword", userController.forgotPassword);

/**
 * @swagger
 * /api/users/updateUser/{id}:
 *  put:
 *    tags: [User]
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
userRouter.put("/updateUser/:id", userController.updateUser);
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    tags: [User]
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
userRouter.delete("/:id", userController.deleteUser);
userRouter.post("/googleLogin", userController.googleLogin);

userRouter.get("/confirm/:confirmationCode", userController.verifyUser)
module.exports = userRouter;
