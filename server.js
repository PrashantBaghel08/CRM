const express = require('express');
const dotenv = require('dotenv');
//const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');



dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Test DB connection
// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Database connection failed:', err.message);
//         process.exit(1);
//     }
//     console.log('Database connected successfully');
//     connection.release(); // release to pool
// });

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
