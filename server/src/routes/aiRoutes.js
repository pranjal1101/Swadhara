const express = require('express');
const { getCourseRecommendations, askTutorQuestion } = require('../controllers/aiController');

const router = express.Router();

// Feature 1: AI Course Recommender
router.post('/recommend', getCourseRecommendations);

// Feature 2: AI Course Tutor / Doubt Solver
router.post('/ask', askTutorQuestion);

module.exports = router;
