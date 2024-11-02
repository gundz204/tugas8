const express = require("express");
const bookController = require("../controllers/book_controller");
const upload = require("../middleware/upload");

const bookRoutes = express.Router();

// Rute untuk buku
bookRoutes.get("/books", bookController.getAllBooks);
bookRoutes.get("/book/:id", bookController.getBookById);
bookRoutes.post("/book", bookController.createBook);
bookRoutes.put("/book/:id", bookController.updateBook);
bookRoutes.delete("/book/:id", bookController.deleteBook);

// Rute untuk upload sampul buku
bookRoutes.post("/book/upload", upload.single('cover'), bookController.uploadCover);

module.exports = bookRoutes;
