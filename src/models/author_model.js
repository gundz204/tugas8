const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    biography: String,
    imagePath: { type: String } // Field untuk menyimpan path gambar
});

// Membuat model Author berdasarkan schema
const Author = mongoose.model('Author', authorSchema); // Koleksi: "authors"

module.exports = Author;
