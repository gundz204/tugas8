const Book = require('../models/book_model');

const bookController = {};

// Mendapatkan semua buku dengan data Author dan Category terpopulasi
bookController.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author').populate('category');
        res.status(200).json({ data: books });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve books", error: error.message });
    }
};

// Mendapatkan buku berdasarkan ID dengan data Author dan Category terpopulasi
bookController.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('category');
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ data: book });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the book", error: error.message });
    }
};

// Menambahkan buku baru
bookController.createBook = async (req, res) => {
    const { title, author, category, stock } = req.body;

    // Validasi input
    if (!title || !author || !category || stock === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        res.status(201).json({ message: "Book created successfully", data: savedBook });
    } catch (error) {
        res.status(400).json({ message: "Failed to create the book", error: error.message });
    }
};

// Mengupdate buku
bookController.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author').populate('category');
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
        res.status(400).json({ message: "Failed to update the book", error: error.message });
    }
};

// Menghapus buku
bookController.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete the book", error: error.message });
    }
};

// Mengupload cover buku
bookController.uploadCover = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    res.status(200).json({
        message: "File uploaded successfully",
        filePath: req.file.path // Menyediakan path file yang bisa diakses
    });
};

module.exports = bookController;
