const multer = require("multer");
const path = require("path");

// Atur penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Menentukan folder penyimpanan
        const dir = path.join(__dirname, '../uploads/');
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Mengatur nama file yang disimpan dengan penambahan timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Inisialisasi multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5 MB
    fileFilter: (req, file, cb) => {
        // Memfilter jenis file yang diizinkan (misalnya hanya gambar)
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: File upload hanya dapat berupa gambar (JPEG, JPG, PNG, GIF).");
        }
    }
});

module.exports = upload;
