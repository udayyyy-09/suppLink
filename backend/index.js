const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authMiddleware = require('./middlewares/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/orders');

// Route middleware
app.use('/api', authRoutes);
app.use('/api/inventory', authMiddleware, inventoryRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

// Add this near your other routes in index.js
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});