const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: [true, 'English course title is required'] },
    hi: { type: String, required: [true, 'Hindi course title is required'] },
    gu: { type: String, required: [true, 'Gujarati course title is required'] }
  },
  description: {
    en: { type: String, required: [true, 'English course description is required'] },
    hi: { type: String, required: [true, 'Hindi course description is required'] },
    gu: { type: String, required: [true, 'Gujarati course description is required'] }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
