const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

const getUserProgress = async (userId, courseId) => {
  let progress = await Progress.findOne({ user: userId, course: courseId });

  if (!progress) {
    progress = await Progress.create({
      user: userId,
      course: courseId,
      completedLessons: [],
      percentage: 0
    });
  }

  return progress;
};

const markLessonComplete = async (userId, courseId, lessonId) => {
  let progress = await Progress.findOne({ user: userId, course: courseId });

  if (!progress) {
    progress = new Progress({
      user: userId,
      course: courseId,
      completedLessons: []
    });
  }

  const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
  if (!lesson) {
    throw new Error('Lesson does not belong to this course');
  }

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }

  const totalLessons = await Lesson.countDocuments({ course: courseId });
  if (totalLessons > 0) {
    progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
  } else {
    progress.percentage = 0;
  }

  progress.lastAccessed = Date.now();
  await progress.save();

  return progress;
};

const getUserEnrolledCourses = async (userId) => {
  return await Progress.find({ user: userId })
    .populate({
      path: 'course',
      populate: { path: 'category' }
    })
    .sort({ lastAccessed: -1 });
};

module.exports = {
  getUserProgress,
  markLessonComplete,
  getUserEnrolledCourses
};
