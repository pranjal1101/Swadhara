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

router.get('/', listCourses);

router.get('/user/enrolled', authenticateUser, getEnrolledCourses);

router.get('/:id', getCourse);

router.get('/:id/lessons/:lessonId', authenticateUser, getLesson);
router.get('/:id/progress', authenticateUser, getProgress);
router.post('/:id/lessons/:lessonId/complete', authenticateUser, completeLesson);

module.exports = router;
