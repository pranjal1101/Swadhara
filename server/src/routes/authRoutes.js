const express = require('express');
const { register, login, getMe, upgradeToSeller, updateProfile } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

router.get('/me', authenticateUser, getMe);
router.post('/upgrade', authenticateUser, upgradeToSeller);
router.put('/profile', authenticateUser, updateProfile);

module.exports = router;
