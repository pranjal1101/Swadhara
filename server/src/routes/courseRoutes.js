const express = require('express');
const {
  listCourses,
  getCourse,
  getLesson,
  getProgress,
  completeLesson
} = require('../controllers/courseController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', listCourses);
router.get('/:id', getCourse);

// Protected routes (Requires logging in)
router.get('/:id/lessons/:lessonId', authenticateUser, getLesson);
router.get('/:id/progress', authenticateUser, getProgress);
router.post('/:id/lessons/:lessonId/complete', authenticateUser, completeLesson);

module.exports = router;
