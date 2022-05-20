const Category = require("../models/CategoryModel.js");

exports.getCategories = async (req, res) => {
    try {
        let perPage = 100;
        let page = req.query.page || 1;
        await Category
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, result) => {
                Category.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        result,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    });
                });
            });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save().then(res.status(201).json(category));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        Object.assign(category, req.body);
        category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        await category.remove();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
