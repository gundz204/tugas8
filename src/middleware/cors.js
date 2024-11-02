const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Ganti dengan domain yang sesuai
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

module.exports = cors(corsOptions);
