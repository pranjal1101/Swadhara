/**
 * Swadhara MERN Database Statistics Helper Script
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Progress = require('../models/Progress');

const printStats = async () => {
  console.log('--- SWADHARA DATABASE STATISTICS ---');
  try {
    await connectDB();

    const [
      usersCount,
      categoriesCount,
      coursesCount,
      lessonsCount,
      productsCount,
      ordersCount,
      progressCount
    ] = await Promise.all([
      User.countDocuments({}),
      Category.countDocuments({}),
      Course.countDocuments({}),
      Lesson.countDocuments({}),
      Product.countDocuments({}),
      Order.countDocuments({}),
      Progress.countDocuments({})
    ]);

    console.log(`\n👥 Users: ${usersCount}`);
    console.log(`🗂️ Categories: ${categoriesCount}`);
    console.log(`📚 Courses: ${coursesCount}`);
    console.log(`🎥 Lessons: ${lessonsCount}`);
    console.log(`🛍️ Products: ${productsCount}`);
    console.log(`📦 Orders: ${ordersCount}`);
    console.log(`📈 Learning Progress Records: ${progressCount}`);

    console.log('\n-----------------------------------');
  } catch (error) {
    console.error('Error printing database stats:', error);
  } finally {
    mongoose.connection.close();
  }
};

printStats();
