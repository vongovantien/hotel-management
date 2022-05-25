const Product = require("../models/ProductModel.js");
const cloudinary = require("cloudinary");

getAllProducts = async (req, res) => {
    try {
        let perPage = req.query.perPage || 5;
        let page = req.query.page || 1;

        await Product.find()
            .select("-reviews -description -createdAt -updatedAt -__v")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, result) => {
                Product.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        success: true,
                        result,
                        current: page,
                        pages: Math.ceil(count / perPage),
                    });
                });
            });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
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

        const existItem = await Product.find({ name });
        if (existItem) {
            return res.status(400).json({
                success: false,
                message: "Sản phẩm đã tồn tại",
            });
        }

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
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
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
        const existItem = await Product.findById(req.params.id);
        if (!existItem) {
            res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại trong hệ thống",
            });
        }
        await existItem.remove();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
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
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    addProductReview,
};
