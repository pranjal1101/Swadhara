const express = require('express');
const { register, login, getMe, upgradeToSeller } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// Public auth routes
router.post('/register', register);
router.post('/login', login);

// Protected profile routes
router.get('/me', authenticateUser, getMe);
router.post('/upgrade', authenticateUser, upgradeToSeller);

module.exports = router;
