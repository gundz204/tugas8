const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    biography: String,
});

const Author = mongoose.model('Author', authorSchema); // Koleksi: "authors"

module.exports = Author;
