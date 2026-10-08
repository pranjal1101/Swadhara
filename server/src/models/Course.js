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
  thumbnail: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    default: 'Swadhara'
  },
  instructor: {
    type: String,
    default: 'Swadhara'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  level: {
    type: String,
    default: function() { return this.difficulty || 'Easy'; }
  },
  duration: {
    type: String,
    required: true
  },
  learningOutcomes: [{
    en: { type: String },
    hi: { type: String },
    gu: { type: String }
  }],
  materials: [{
    en: { type: String },
    hi: { type: String },
    gu: { type: String }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
