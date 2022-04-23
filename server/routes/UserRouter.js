const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/AuthMiddleware.js");
const userRoute = express.Router();

userRoute.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
);

userRoute.get(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findById(req.user._id);
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            });
        } else {
            res.status(401);
            throw new Error("User not found !!");
        }
    })
);

userRoute.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({
                success: false,
                message: "User already exist",
            });
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error",
            });
        }
    })
);

// productRoute.get(
//     "/:id",
//     asyncHandler(async (req, res) => {
//         const User = await User.findById(req.params.id);
//         if (User) {
//             return res.status(200).json(User);
//         } else {
//             res.status(404);
//             throw new Error("User not found !!");
//         }
//     })
// );

module.exports = userRoute;
