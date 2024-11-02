const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow_controller');

// Menambahkan data peminjam buku
router.post('/borrow/book', borrowController.borrowBook);

// Mendapatkan daftar peminjam buku yang masih aktif
router.get('/borrow/book/list', borrowController.getActiveBorrows);

// Menambahkan data pengembalian buku
router.post('/borrow/book/return', borrowController.returnBook);

module.exports = router;
