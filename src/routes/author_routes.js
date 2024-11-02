const express = require("express");
const authorController = require("../controllers/author_controller");

const authorRoutes = express.Router();

authorRoutes.get("/authors", authorController.getAllAuthors);
authorRoutes.get("/author/:id", authorController.getAuthorById);
authorRoutes.post("/author", authorController.createAuthor);
authorRoutes.put("/author/:id", authorController.updateAuthor);
authorRoutes.delete("/author/:id", authorController.deleteAuthor);

module.exports = authorRoutes;
