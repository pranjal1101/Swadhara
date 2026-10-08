const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Category = require('../models/Category');

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
