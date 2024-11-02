const Borrower = require('../models/borrower_model');

const borrowerController = {};

// Mendapatkan semua peminjam
borrowerController.getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find();
        res.status(200).json(borrowers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan peminjam berdasarkan ID
borrowerController.getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id);
        if (!borrower) return res.status(404).json({ message: "Borrower not found" });
        res.status(200).json(borrower);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambahkan peminjam baru
borrowerController.createBorrower = async (req, res) => {
    const borrower = new Borrower(req.body);
    try {
        const savedBorrower = await borrower.save();
        res.status(201).json(savedBorrower);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate peminjam
borrowerController.updateBorrower = async (req, res) => {
    try {
        const updatedBorrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBorrower) return res.status(404).json({ message: "Borrower not found" });
        res.status(200).json(updatedBorrower);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus peminjam
borrowerController.deleteBorrower = async (req, res) => {
    try {
        const deletedBorrower = await Borrower.findByIdAndDelete(req.params.id);
        if (!deletedBorrower) return res.status(404).json({ message: "Borrower not found" });
        res.status(200).json({ message: "Borrower deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = borrowerController;
