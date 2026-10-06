const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Category = require('../models/Category');

/**
 * Get all courses, optionally filtered by category slug, difficulty, or search query
 */
const getCourses = async (categorySlug, difficulty, search) => {
  let filter = {};
  
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) {
      filter.category = category._id;
    } else {
      return [];
    }
  }

  if (difficulty && difficulty !== 'All') {
    filter.difficulty = difficulty;
  }

  if (search && search.trim() !== '') {
    const regex = new RegExp(search.trim(), 'i');
    filter.$or = [
      { 'title.en': regex },
      { 'title.hi': regex },
      { 'title.gu': regex },
      { 'description.en': regex },
      { 'description.hi': regex },
      { 'description.gu': regex }
    ];
  }

  return await Course.find(filter).populate('category');
};

/**
 * Get course details and all its lessons ordered by order field
 */
const getCourseDetails = async (courseId) => {
  const course = await Course.findById(courseId).populate('category');
  if (!course) {
    throw new Error('Course not found');
  }

  const lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });
  
  return {
    course,
    lessons
  };
};

/**
 * Get details for a single lesson
 */
const getLessonDetails = async (courseId, lessonId) => {
  const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
  if (!lesson) {
    throw new Error('Lesson not found in this course');
  }
  return lesson;
};

module.exports = {
  getCourses,
  getCourseDetails,
  getLessonDetails
};
