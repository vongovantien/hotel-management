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
userRoute.post("/login", userController.login)
userRoute.post("/register", userController.register)
userRoute.post("/login", userController.forgotPassword)
userRoute.post("/login", userController.updatePassword)
userRoute.post("/login", userController.updateUser)
userRoute.get("/:id", userController.deleteUser)

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

userRoute.put(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            if (req.body.password) {
                user.password = req.body.password;
            } else {
                res.status(404);
                throw new Error("User not found");
            }
            const updateUser = await user.save();
            res.json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                createAt: updateUser.createAt,
                token: generateToken(updateUser._id),
            });
        } else {
            res.status(404);
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

// userRoute.post(
//     "/register",
//     asyncHandler(async (req, res) => {
//         const { name, email, password } = req.body;
//         const userExist = await User.findOne({ email });
//         if (userExist) {
//             res.status(400).json({
//                 success: false,
//                 message: "User already exist",
//             });
//         }

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "tienvo300820@gmail.com", // generated ethereal user
//                 pass: "0329292209Tien@", // generated ethereal password
//             },
//         });

//         let mailOptions = {
//             from: "tienvo300820@gmail.com",
//             to: "vongovantien@gmail.com",
//             subject: "abc",
//             text: "confirm-password",
//         };

//         const sendMail = transporter.sendMail(mailOptions);

//         //Tiến hành trả về thông báo
//         sendMail
//             .then((result) => {
//                 res.status(200).json({
//                     success: true,
//                     message: "Thanh cong",
//                 });
//             })
//             .catch((err) => {
//                 res.status(400).json({
//                     success: false,
//                     message: err,
//                 });
//             });
//     })
// );

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
