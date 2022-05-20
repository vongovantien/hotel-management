const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/AuthMiddleware.js");
const userRoute = express.Router();
const nodemailer = require("nodemailer");
const userController = require("../controllers/UserController")

userRoute.get("/profile", userController.profile)
userRoute.get("/", userController.getAllUsers)
userRoute.post("/register", asyncHandler(userController.register))
userRoute.post("/login", userController.login)
userRoute.post("/login", userController.forgotPassword)
userRoute.post("/login", userController.updatePassword)
userRoute.post("/login", userController.updateUser)
userRoute.get("/:id", userController.deleteUser)

module.exports = userRoute;
