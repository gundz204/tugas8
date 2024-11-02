const express = require("express");
const bookController = require("../controllers/book_controller");
const upload = require("../middleware/upload"); // Pastikan path ini benar

const bookRoutes = express.Router();

// Rute untuk mendapatkan semua buku
bookRoutes.get("/books", bookController.getAllBooks);

// Rute untuk mendapatkan buku berdasarkan ID
bookRoutes.get("/book/:id", bookController.getBookById);

// Rute untuk menambahkan buku baru
bookRoutes.post("/book", bookController.createBook);

// Rute untuk mengupdate buku
bookRoutes.put("/book/:id", bookController.updateBook);

// Rute untuk menghapus buku
bookRoutes.delete("/book/:id", bookController.deleteBook);

// Rute untuk mengupload cover buku
bookRoutes.post("/book/upload", upload.single('cover'), bookController.uploadCover);

module.exports = bookRoutes;
