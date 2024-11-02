const express = require("express");
const categoryController = require("../controllers/category_controller");

const categoryRoutes = express.Router();

categoryRoutes.get("/categories", categoryController.getAllCategories);
categoryRoutes.get("/xategory/:id", categoryController.getCategoryById);
categoryRoutes.post("/xategory", categoryController.createCategory);
categoryRoutes.put("/xategory/:id", categoryController.updateCategory);
categoryRoutes.delete("/xategory/:id", categoryController.deleteCategory);

module.exports = categoryRoutes;
