const aiService = require('../services/aiService');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

/**
 * @desc    Get AI course recommendations based on user preferences
 * @route   POST /api/ai/recommend
 * @access  Public
 */
const getCourseRecommendations = async (req, res, next) => {
  try {
    const { interest, skillLevel, goal, timeCommitment, language } = req.body;

    // Fetch all existing courses from MongoDB
    const availableCourses = await Course.find({}).populate('category');

    if (!availableCourses || availableCourses.length === 0) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const preferences = {
      interest: interest || 'Not sure',
      skillLevel: skillLevel || 'Beginner',
      goal: goal || 'Learn a new skill',
      timeCommitment: timeCommitment || '30-60 minutes'
    };

    // Get recommendations from AI service
    const rawRecommendations = await aiService.recommendCourses(
      preferences,
      availableCourses,
      language || 'en'
    );

    // Populate actual full MongoDB Course objects
    const courseMap = new Map(availableCourses.map(c => [c._id.toString(), c]));

    const hydratedRecommendations = rawRecommendations
      .map(rec => {
        const course = courseMap.get(rec.courseId);
        if (!course) return null;
        return {
          rank: rec.rank,
          reason: rec.reason,
          course: course
        };
      })
      .filter(item => item !== null);

    res.status(200).json({
      success: true,
      data: hydratedRecommendations
    });
  } catch (error) {
    console.error('AI recommendation controller error:', error);
    res.status(500).json({
      success: false,
      message: 'AI recommendation service is temporarily unavailable. Please try again.'
    });
  }
};

/**
 * @desc    Ask AI tutor a doubt about a specific course or lesson
 * @route   POST /api/ai/ask
 * @access  Public / Learner
 */
const askTutorQuestion = async (req, res, next) => {
  try {
    const { courseId, lessonId, question, language } = req.body;

    // Input validation
    if (!question || typeof question !== 'string' || question.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Question cannot be empty. Please enter a valid question.'
      });
    }

    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Question is too long. Please shorten your question to under 500 characters.'
      });
    }

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required to ask a question.'
      });
    }

    // Fetch real course from MongoDB
    const course = await Course.findById(courseId).populate('category');
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.'
      });
    }

    // Fetch lesson if lessonId provided
    let lesson = null;
    if (lessonId) {
      lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
    }

    // Call AI Tutor service
    const answer = await aiService.askCourseTutor({
      course,
      lesson,
      question: trimmedQuestion,
      language: language || 'en'
    });

    res.status(200).json({
      success: true,
      answer: answer,
      data: {
        answer: answer
      }
    });
  } catch (error) {
    console.error('AI tutor controller error:', error);
    res.status(500).json({
      success: false,
      message: 'AI tutor service is temporarily unavailable. Please try again.'
    });
  }
};

module.exports = {
  getCourseRecommendations,
  askTutorQuestion
};
