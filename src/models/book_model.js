const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, required: true },
    coverImagePath: { type: String } // Menyimpan path gambar cover
});

const Book = mongoose.model('Book', bookSchema); // Koleksi: "books"

module.exports = Book;
