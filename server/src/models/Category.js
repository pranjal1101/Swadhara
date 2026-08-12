const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    en: {
      type: String,
      required: [true, 'English category name is required']
    },
    hi: {
      type: String,
      required: [true, 'Hindi category name is required']
    },
    gu: {
      type: String,
      required: [true, 'Gujarati category name is required']
    }
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);
