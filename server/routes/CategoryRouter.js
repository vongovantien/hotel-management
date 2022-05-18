const express = require("express");
const asyncHandler = require("express-async-handler");
const categoryController = require("../controllers/CategoryController");
const categoryRoute = express.Router();

categoryRoute
    .route("/:id")
    .get(categoryController.getCategoryById)
    .delete(categoryController.deleteCategory)
    .get(categoryController.updateCategory);

categoryRoute
    .route("/")
    .get(categoryController.getCategories)
    .post(categoryController.addCategory);

// categoryRoute.get(
//     "/:id",
//     asyncHandler(async (req, res) => {
//         const existCategory = await Category.findById(req.params.id);

//         if (!existCategory) {
//             return res.status(404).json({
//                 error: true,
//                 message: "Loại sản phẩm không tồn tại trong hệ thống",
//             });
//         } else {
//             return res.status(200).json({
//                 error: false,
//                 data: existCategory,
//             });
//         }
//     })
// );

// categoryRoute.delete(
//     "/:id",
//     asyncHandler(async (req, res) => {
//         const id = req.params.id;
//         const deleteCategory = await Category.deleteOne({ _id: id });

//         if (!deleteCategory) {
//             return res.status(400).json({
//                 error: true,
//                 message: "Loại sản phẩm đã tồn tại trong hệ thống",
//             });
//         } else {
//             return res.status(400).json({
//                 error: false,
//                 message: "Xóa loại sản phẩm thành công",
//             });
//         }
//     })
// );

// categoryRoute.post(
//     "/",
//     asyncHandler(async (req, res) => {
//         const { name, productType } = req.body;
//         const existCategory = await Category.findOne({ name });

//         if (existCategory) {
//             return res.status(400).json({
//                 error: true,
//                 message: "Loại sản phẩm đã tồn tại trong hệ thống",
//             });
//         }

//         const newCate = await Category.create({
//             name,
//             productType,
//         });

//         return res.status(201).json({
//             error: false,
//             newCate,
//         });
//     })
// );

module.exports = categoryRoute;
