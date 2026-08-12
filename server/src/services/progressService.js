const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

/**
 * Get or initialize user progress for a specific course
 */
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

/**
 * Mark a lesson as completed and update progress percentage
 */
const markLessonComplete = async (userId, courseId, lessonId) => {
  let progress = await Progress.findOne({ user: userId, course: courseId });
  
  if (!progress) {
    progress = new Progress({
      user: userId,
      course: courseId,
      completedLessons: []
    });
  }

  // Ensure lesson belongs to this course
  const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
  if (!lesson) {
    throw new Error('Lesson does not belong to this course');
  }

  // Add lesson to completed array if not already present
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }

  // Calculate percentage
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

module.exports = {
  getUserProgress,
  markLessonComplete
};
