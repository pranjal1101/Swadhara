const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swadhara');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}. Fallback to local MongoDB...`);
    try {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/swadhara');
      console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`Fallback MongoDB Connection Error: ${fallbackError.message}`);
      process.exit(1);
    }
  }

  try {
    // Auto-seed initial data non-destructively if database is fresh/empty
    const Course = require('../models/Course');
    const count = await Course.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Populating default courses and categories...');
      const { seedData } = require('../seed/seed');
      await seedData(false);
    }
  } catch (seedErr) {
    console.error('Seed check error:', seedErr.message);
  }
};

module.exports = connectDB;
