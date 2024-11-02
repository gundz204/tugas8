const express = require("express");
const routes = require("./routes"); // Pastikan rute sudah terdefinisi
const connectDB = require("./config/mongodb"); // Koneksi ke database
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: './src/.env' }); // Mengatur konfigurasi dotenv

const app = express();
const port = process.env.PORT || 3000;

// Menghubungkan ke database
connectDB();

// Middleware
app.use(cors()); // Mengizinkan CORS
app.use(express.json()); // Mengurai JSON dari request body

// Menggunakan routing yang sudah didefinisikan
app.use("/api/v1", routes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
