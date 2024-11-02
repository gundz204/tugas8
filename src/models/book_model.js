const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    publishedDate: Date,
    stock: { type: Number, default: 1 },
});

const Book = mongoose.model('Book', bookSchema); // Koleksi: "books"

module.exports = Book;
