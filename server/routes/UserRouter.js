const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel.js");

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
                token: null,
                createdAt: user.createdAt,
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
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
