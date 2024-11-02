const express = require("express");
const authorController = require("../controllers/author_controller");
const upload = require("../middleware/upload"); // Pastikan path ini benar

const authorRoutes = express.Router();

// Rute untuk mendapatkan semua penulis
authorRoutes.get("/authors", authorController.getAllAuthors);

// Rute untuk mendapatkan penulis berdasarkan ID
authorRoutes.get("/author/:id", authorController.getAuthorById);

// Rute untuk menambahkan penulis baru
authorRoutes.post("/author", authorController.createAuthor);

// Rute untuk mengupdate penulis
authorRoutes.put("/author/:id", authorController.updateAuthor);

// Rute untuk menghapus penulis
authorRoutes.delete("/author/:id", authorController.deleteAuthor);

// Rute untuk mengupload gambar penulis
authorRoutes.post("/author/upload", upload.single('image'), authorController.uploadAuthorImage); // Menghilangkan parameter ID di URL

module.exports = authorRoutes;
