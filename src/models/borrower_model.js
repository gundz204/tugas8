const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: String,
    address: String,
});

const Borrower = mongoose.model('Borrower', borrowerSchema); 

module.exports = Borrower;
