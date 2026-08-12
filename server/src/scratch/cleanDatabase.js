/**
 * Swadhara MERN Database Reset/Cleanup Utility Script
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Order = require('../models/Order');
const Progress = require('../models/Progress');
const Product = require('../models/Product');

const cleanDatabase = async () => {
  console.log('--- SWADHARA DATABASE CLEANUP UTILITY ---');
  try {
    await connectDB();

    const mode = process.argv[2];

    if (mode === 'orders') {
      const res = await Order.deleteMany({});
      console.log(`🧹 Deleted all Order logs. Count: ${res.deletedCount}`);
    } else if (mode === 'progress') {
      const res = await Progress.deleteMany({});
      console.log(`🧹 Deleted all Learner Progress records. Count: ${res.deletedCount}`);
    } else if (mode === 'all') {
      const [ordersRes, progressRes] = await Promise.all([
        Order.deleteMany({}),
        Progress.deleteMany({})
      ]);
      console.log(`🧹 Wiped transaction logs. Deleted orders: ${ordersRes.deletedCount}, progress: ${progressRes.deletedCount}`);
    } else {
      console.log('Usage: node cleanDatabase.js [orders | progress | all]');
      console.log('No option selected. Skipping deletion.');
    }

    console.log('------------------------------------------');
  } catch (error) {
    console.error('Cleanup operation failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

cleanDatabase();
