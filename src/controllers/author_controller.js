const Author = require('../models/author_model');

const authorController = {};

// Mendapatkan semua penulis
authorController.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan penulis berdasarkan ID
authorController.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambahkan penulis baru
authorController.createAuthor = async (req, res) => {
    const author = new Author(req.body);
    try {
        const savedAuthor = await author.save();
        res.status(201).json(savedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate penulis
authorController.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus penulis
authorController.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });
        res.status(200).json({ message: "Author deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = authorController;
