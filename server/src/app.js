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

app.use('/api/auth', authRoutes);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
