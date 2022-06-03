const express = require("express");
const User = require("./models/UserModel.js");
const Product = require("./models/ProductModel.js");
const users = require("./data/users.js");
const products = require("./data/products.js");
const asyncHandler = require("express-async-handler");
const constData = express.Router();

constData.post(
    "/user",
    asyncHandler(async (req, res) => {
        await User.deleteMany({});
        const constUser = await User.insertMany(users);
        res.send({ constUser });
    })
);

constData.post(
    "/products",
    asyncHandler(async (req, res) => {
        await Product.deleteMany({});
        const constProduct = await Product.insertMany(products);
        res.send({ constProduct });
    })
);
module.exports = constData;
