const express = require('express');
const {
  listCourses,
  getCourse,
  getLesson,
  getProgress,
  completeLesson,
  getEnrolledCourses
} = require('../controllers/courseController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', listCourses);

// Protected routes (User enrolled list)
router.get('/user/enrolled', authenticateUser, getEnrolledCourses);

// Public course detail
router.get('/:id', getCourse);

// Protected routes (Requires logging in)
router.get('/:id/lessons/:lessonId', authenticateUser, getLesson);
router.get('/:id/progress', authenticateUser, getProgress);
router.post('/:id/lessons/:lessonId/complete', authenticateUser, completeLesson);

module.exports = router;
