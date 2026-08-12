const courseService = require('../services/courseService');
const progressService = require('../services/progressService');

/**
 * @desc    Get all courses (optional category filter)
 * @route   GET /api/courses
 * @access  Public
 */
const listCourses = async (req, res, next) => {
  try {
    const { category } = req.query;
    const courses = await courseService.getCourses(category);
    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get course details & lessons list
 * @route   GET /api/courses/:id
 * @access  Public
 */
const getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const courseData = await courseService.getCourseDetails(courseId);
    res.status(200).json({
      success: true,
      data: courseData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single lesson detail
 * @route   GET /api/courses/:id/lessons/:lessonId
 * @access  Private (Registered users only)
 */
const getLesson = async (req, res, next) => {
  try {
    const { id: courseId, lessonId } = req.params;
    const lesson = await courseService.getLessonDetails(courseId, lessonId);
    res.status(200).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user progress for a course
 * @route   GET /api/courses/:id/progress
 * @access  Private (Registered users only)
 */
const getProgress = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;
    const progress = await progressService.getUserProgress(userId, courseId);
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark a lesson as completed
 * @route   POST /api/courses/:id/lessons/:lessonId/complete
 * @access  Private (Registered users only)
 */
const completeLesson = async (req, res, next) => {
  try {
    const { id: courseId, lessonId } = req.params;
    const userId = req.user._id;

    const progress = await progressService.markLessonComplete(userId, courseId, lessonId);
    res.status(200).json({
      success: true,
      message: 'Lesson marked as complete',
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's enrolled courses and percentages
 * @route   GET /api/courses/user/enrolled
 * @access  Private (Registered users only)
 */
const getEnrolledCourses = async (req, res, next) => {
  try {
    const enrolled = await progressService.getUserEnrolledCourses(req.user._id);
    res.status(200).json({
      success: true,
      data: enrolled
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCourses,
  getCourse,
  getLesson,
  getProgress,
  completeLesson,
  getEnrolledCourses
};
