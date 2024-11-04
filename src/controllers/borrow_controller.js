const Borrow = require('../models/borrow_model');
const Book = require('../models/book_model');
const Borrower = require('../models/borrower_model');

const borrowController = {};

// Menambahkan data peminjam buku
borrowController.borrowBook = async (req, res) => {
    const { bookId, borrowerId } = req.body;

    if (!bookId || !borrowerId) {
        return res.status(400).json({ message: "Book ID and Borrower ID are required." });
    }

    try {
        const book = await Book.findById(bookId).populate('author').populate('category');
        const borrower = await Borrower.findById(borrowerId);

        if (!book || !borrower) {
            return res.status(404).json({ message: "Book or Borrower not found." });
        }

        // Membuat record peminjaman baru
        const borrow = new Borrow({
            book: bookId,
            borrower: borrowerId,
            borrowDate: new Date(),
            isReturned: false
        });
        await borrow.save();

        // Menghitung deadline pengembalian
        const returnDeadline = new Date(borrow.borrowDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 hari dari tanggal peminjaman

        // Response dengan info lengkap
        res.status(201).json({
            message: "Book borrowed successfully",
            data: {
                borrowId: borrow._id,
                book: {
                    title: book.title,
                    author: {
                        name: book.author.name,
                        bio: book.author.bio
                    },
                    category: {
                        name: book.category.name,
                        description: book.category.description
                    },
                    stock: book.stock,
                    coverImagePath: book.coverImagePath
                },
                borrower: {
                    name: borrower.name,
                    contact: borrower.contact,
                    address: borrower.address
                },
                borrowDate: borrow.borrowDate.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
                returnDeadline: returnDeadline.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to borrow the book", error: error.message });
    }
};

// Mendapatkan daftar peminjam buku yang masih aktif
borrowController.getActiveBorrows = async (req, res) => {
    try {
        const activeBorrows = await Borrow.find({ isReturned: false })
            .populate({
                path: 'book',
                populate: { path: 'author category' } // Populate penulis dan kategori
            })
            .populate('borrower');

        // Menambahkan deadline pengembalian ke setiap borrow
        const borrowsWithDeadline = activeBorrows.map(borrow => {
            const returnDeadline = new Date(borrow.borrowDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 hari
            return {
                ...borrow._doc, // Mengambil semua properti dari borrow
                returnDeadline: returnDeadline.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
                borrowDate: borrow.borrowDate.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            };
        });

        res.status(200).json({ data: borrowsWithDeadline });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve active borrows", error: error.message });
    }
};

// Menambahkan data pengembalian buku
borrowController.returnBook = async (req, res) => {
    const { borrowId } = req.body;

    if (!borrowId) {
        return res.status(400).json({ message: "Borrow ID is required." });
    }

    try {
        const borrow = await Borrow.findById(borrowId).populate('book').populate('borrower');

        if (!borrow) {
            return res.status(404).json({ message: "Borrow record not found." });
        }

        // Menghitung denda jika terlambat
        const returnDate = new Date();
        borrow.returnDate = returnDate;
        borrow.isReturned = true;

        const returnDeadline = new Date(borrow.borrowDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 hari
        const borrowDuration = Math.floor((returnDate - borrow.borrowDate) / (1000 * 60 * 60 * 24)); // Durasi dalam hari
        const lateFeePerDay = 5000; // Denda per hari
        const maxBorrowDuration = 3; // Batas peminjaman 3 hari

        let penalty = 0;
        if (borrowDuration > maxBorrowDuration) {
            penalty = (borrowDuration - maxBorrowDuration) * lateFeePerDay; // Hitung denda
        }

        await borrow.save();

        res.status(200).json({
            message: "Book returned successfully",
            penalty: penalty,
            returnDate: returnDate.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
            returnDeadline: returnDeadline.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to return the book", error: error.message });
    }
};

module.exports = borrowController;
