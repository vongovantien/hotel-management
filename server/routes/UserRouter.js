const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/AuthMiddleware.js");
const userRoute = express.Router();
const nodemailer = require("nodemailer");
const userController = require("../controllers/UserController");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - age
 *        - classId
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        firstName:
 *          type: string
 *          description: The user first name
 *        lastName:
 *          type: string
 *          description: The user last name
 *        age:
 *          type: number
 *          description: The user age
 *        classId:
 *          type: string
 *          description: Class id of user
 *      example:
 *        id: 22ace041-6386-483c-82b6-9aba0fbbc61e
 *        firstName: John
 *        lastName: Doe
 *        age: 17
 *        classId: 5f744a89-54aa-4a89-a845-b84208cbb651
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

userRoute.get("/getAllUsers", userController.getAllUsers);

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
userRoute.get("/profile/:id", userController.profile);
/**
 * @swagger
 * /api/register:
 *  post:
 *    tags: [Authenticate]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - age
 *              - classId
 *            properties:
 *              id:
 *                type: string
 *                description: The auto-generated id of the student
 *              firstName:
 *                type: string
 *                description: The student first name
 *              lastName:
 *                type: string
 *                description: The student last name
 *              age:
 *                type: number
 *                description: The student age
 *              classId:
 *                type: string
 *                description: Class id of student
 *            example:
 *              firstName: John
 *              lastName: Doe
 *              age: 17
 *              classId: 5f744a89-54aa-4a89-a845-b84208cbb651
 *    responses:
 *      200:
 *        description: The student was created success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Student'
 *      500:
 *        description: Some server error
 */
userRoute.post("/register", asyncHandler(userController.register));

userRoute.post("/login", userController.login);

userRoute.post("/login", userController.forgotPassword);
/**
 * @swagger
 * /api/users/updateUser/{id}:
 *  put:
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        required: true
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
userRoute.put("/updateUser/:id", userController.updateUser);
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
userRoute.delete("/:id", userController.deleteUser);
userRoute.post("/googleLogin", userController.googleLogin);

module.exports = userRoute;
