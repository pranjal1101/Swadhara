const courseService = require('../services/courseService');
const progressService = require('../services/progressService');

const listCourses = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const courses = await courseService.getCourses(category, difficulty, search);
    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

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
