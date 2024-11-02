const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    isReturned: { type: Boolean, default: false }
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;
