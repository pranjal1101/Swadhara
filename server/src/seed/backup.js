/**
 * Swadhara MERN Database Backup & Restore Utility Script
 */
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Progress = require('../models/Progress');

const BACKUP_DIR = path.join(__dirname, 'backups');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swadhara';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for backup utility');
};

const backup = async () => {
  try {
    await connectDB();

    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR);
    }

    const collections = [
      { model: User, name: 'users' },
      { model: Category, name: 'categories' },
      { model: Course, name: 'courses' },
      { model: Lesson, name: 'lessons' },
      { model: Product, name: 'products' },
      { model: Order, name: 'orders' },
      { model: Progress, name: 'progress' }
    ];

    for (const col of collections) {
      const data = await col.model.find({});
      const filePath = path.join(BACKUP_DIR, `${col.name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Backup completed: ${col.name} (${data.length} records saved to ${filePath})`);
    }

    console.log('All collections backed up successfully!');
  } catch (error) {
    console.error('Backup error:', error);
  } finally {
    mongoose.connection.close();
  }
};

const restore = async () => {
  try {
    await connectDB();

    const collections = [
      { model: User, name: 'users' },
      { model: Category, name: 'categories' },
      { model: Course, name: 'courses' },
      { model: Lesson, name: 'lessons' },
      { model: Product, name: 'products' },
      { model: Order, name: 'orders' },
      { model: Progress, name: 'progress' }
    ];

    for (const col of collections) {
      const filePath = path.join(BACKUP_DIR, `${col.name}.json`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath);
        const data = JSON.parse(raw);
        
        // Clear existing
        await col.model.deleteMany({});
        
        // Restore
        if (data.length > 0) {
          await col.model.insertMany(data);
        }
        console.log(`Restore completed: ${col.name} (${data.length} records restored)`);
      } else {
        console.log(`Backup file not found for: ${col.name}, skipping.`);
      }
    }

    console.log('Database restore operations completed successfully!');
  } catch (error) {
    console.error('Restore error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Check CLI arguments
const mode = process.argv[2];
if (mode === 'restore') {
  restore();
} else {
  backup();
}
