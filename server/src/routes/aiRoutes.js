const express = require('express');
const { getCourseRecommendations, askTutorQuestion } = require('../controllers/aiController');

const router = express.Router();

router.post('/recommend', getCourseRecommendations);

router.post('/ask', askTutorQuestion);

module.exports = router;
