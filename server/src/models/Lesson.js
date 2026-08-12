const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    en: { type: String, required: [true, 'English lesson title is required'] },
    hi: { type: String, required: [true, 'Hindi lesson title is required'] },
    gu: { type: String, required: [true, 'Gujarati lesson title is required'] }
  },
  description: {
    en: { type: String, required: [true, 'English lesson description is required'] },
    hi: { type: String, required: [true, 'Hindi lesson description is required'] },
    gu: { type: String, required: [true, 'Gujarati lesson description is required'] }
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);
