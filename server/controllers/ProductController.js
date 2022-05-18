const Product = require("../models/ProductModel.js");
const cloudinary = require("cloudinary");
getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

addProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock } = req.body;
        const image = await cloudinary.uploader.upload(req.file.path);

        const newProduct = await Product.create({
            name,
            image: image.secure_url,
            description,
            price,
            countInStock,
        });

        if (newProduct) {
            res.status(201).json({
                _id: newProduct._id,
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                countInStock: newProduct.countInStock,
                image: newProduct.image,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error",
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        Object.assign(product, req.body);
        product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.remove();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
addProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        console.log(typeof rating);
        const product = await Product.findById(req.params.id);
        if (product) {
            const alreadyProduct = product.reviews.find(
                (s) => s.user.toString() === req.user._id.toString()
            );
            if (alreadyProduct) {
                res.status(400);
                throw new Error("Product already reviewed");
            }
            const newReview = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };
            product.reviews.push(newReview);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;
            await product.save().then(
                res.status(201).json({
                    error: false,
                    message: "Reviewed add",
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    addProductReview,
};
