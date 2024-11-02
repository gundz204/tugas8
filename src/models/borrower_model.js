const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: String,
    address: String,
});

const Borrower = mongoose.model('Borrower', borrowerSchema); // Koleksi: "borrowers"

module.exports = Borrower;
