const { validationResult } = require("express-validator");
const Category = require("../models/CategoryModel.js");
exports.getCategories = async (req, res) => {
    try {
        let perPage = req.query.perPage || 5;
        let page = req.query.page || 1;
        // let filter = req.query.filter;
        // let sort = req.query.sort;

        await Category.find()
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort("-createAt")
            .exec((err, result) => {
                Category.countDocuments((err, count) => {
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors });
        }
        const category = new Category(req.body);
        await category
            .save()
            .then(res.status(201).json({ success: true, category }));
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
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
