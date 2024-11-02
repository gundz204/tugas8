const express = require("express");
const testRoutes = require("./test_routes"); // Rute untuk testing
const bookRoutes = require("./book_routes"); // Rute untuk buku
const authorRoutes = require("./author_routes"); // Rute untuk penulis
const categoryRoutes = require("./category_routes"); // Rute untuk kategori
const borrowerRoutes = require("./borrower_routes"); // Rute untuk peminjam

const routes = express.Router();

// Kumpulkan semua routes disini per bagian
routes.use(testRoutes); // Rute untuk test
routes.use(bookRoutes); // Rute untuk buku
routes.use(authorRoutes); // Rute untuk penulis
routes.use(categoryRoutes); // Rute untuk kategori
routes.use(borrowerRoutes); // Rute untuk peminjam

module.exports = routes;
