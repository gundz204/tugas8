const Book = require('../models/book_model');

const bookController = {};

// Mendapatkan semua buku dengan data Author dan Category terpopulasi
bookController.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author').populate('category');
        const formattedBooks = books.map(book => ({
            _id: book._id,
            title: book.title,
            author: {
                _id: book.author._id,
                name: book.author.name,
                __v: book.author.__v,
                imagePath: book.author.imagePath
            },
            category: {
                _id: book.category._id,
                name: book.category.name,
                __v: book.category.__v
            },
            stock: book.stock,
            __v: book.__v,
            coverImagePath: book.coverImagePath
        }));
        res.status(200).json({ data: formattedBooks });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve books", error: error.message });
    }
};

// Mendapatkan buku berdasarkan ID dengan data Author dan Category terpopulasi
bookController.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('category');
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.status(200).json({
            data: {
                _id: book._id,
                title: book.title,
                author: {
                    _id: book.author._id,
                    name: book.author.name,
                    __v: book.author.__v,
                    imagePath: book.author.imagePath
                },
                category: {
                    _id: book.category._id,
                    name: book.category.name,
                    __v: book.category.__v
                },
                stock: book.stock,
                __v: book.__v,
                coverImagePath: book.coverImagePath
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the book", error: error.message });
    }
};

// Menambahkan buku baru
// Menambahkan buku baru
bookController.createBook = async (req, res) => {
    const { title, author, category, stock } = req.body;

    if (!title || !author || !category || stock === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        
        // Fetch the newly created book with populated author and category
        const populatedBook = await Book.findById(savedBook._id).populate('author').populate('category');
        
        res.status(201).json({
            message: "Book created successfully",
            data: {
                _id: populatedBook._id,
                title: populatedBook.title,
                author: {
                    _id: populatedBook.author._id,
                    name: populatedBook.author.name,
                    __v: populatedBook.author.__v,
                    imagePath: populatedBook.author.imagePath
                },
                category: {
                    _id: populatedBook.category._id,
                    name: populatedBook.category.name,
                    __v: populatedBook.category.__v
                },
                stock: populatedBook.stock,
                __v: populatedBook.__v,
                coverImagePath: populatedBook.coverImagePath
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Failed to create the book", error: error.message });
    }
};


// Mengupdate buku
bookController.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author').populate('category');
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });

        res.status(200).json({
            message: "Book updated successfully",
            data: {
                _id: updatedBook._id,
                title: updatedBook.title,
                author: {
                    _id: updatedBook.author._id,
                    name: updatedBook.author.name,
                    __v: updatedBook.author.__v,
                    imagePath: updatedBook.author.imagePath
                },
                category: {
                    _id: updatedBook.category._id,
                    name: updatedBook.category.name,
                    __v: updatedBook.category.__v
                },
                stock: updatedBook.stock,
                __v: updatedBook.__v,
                coverImagePath: updatedBook.coverImagePath
            }
        });
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
bookController.uploadCover = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const { bookId } = req.body;
    try {
        const book = await Book.findById(bookId).populate('author').populate('category');

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        book.coverImagePath = req.file.path;
        await book.save();

        res.status(200).json({
            message: "Cover uploaded successfully",
            data: {
                _id: book._id,
                title: book.title,
                author: {
                    _id: book.author._id,
                    name: book.author.name,
                    __v: book.author.__v,
                    imagePath: book.author.imagePath
                },
                category: {
                    _id: book.category._id,
                    name: book.category.name,
                    __v: book.category.__v
                },
                stock: book.stock,
                __v: book.__v,
                coverImagePath: book.coverImagePath
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = bookController;
