const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.use('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Swadhara API Server is healthy and running'
  });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
