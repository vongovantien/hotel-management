const express = require("express");;
const categoryController = require("../controllers/CategoryController.js");
const categoryRoute = express.Router();

const { categoryValidation } = require("../middleware/validation.js");


categoryRoute.get("/:id", categoryController.getCategoryById)
categoryRoute.delete("/:id", categoryController.deleteCategory)
categoryRoute.put("/:id", categoryController.updateCategory);
categoryRoute.get("/", categoryController.getAllCategories)
categoryRoute.post("/", categoryValidation, categoryController.addCategory);

module.exports = categoryRoute;
