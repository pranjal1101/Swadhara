const authService = require('../services/authService');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const userData = await authService.registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      data: userData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const userData = await authService.loginUser({ email, password });

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    // Check for standard login validation messages
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const userProfile = await authService.getUserProfile(req.user._id);
    res.status(200).json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upgrade current user to seller role
 * @route   POST /api/auth/upgrade
 * @access  Private
 */
const upgradeToSeller = async (req, res, next) => {
  try {
    const upgradedUser = await authService.upgradeUserToSeller(req.user._id);
    res.status(200).json({
      success: true,
      message: 'Successfully upgraded profile to Maker status',
      data: upgradedUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update current user profile details
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, location, profileImage } = req.body;
    
    if (name === '') {
      return res.status(400).json({ success: false, message: 'Name cannot be empty' });
    }

    const updatedUser = await authService.updateUserProfile(req.user._id, {
      name,
      bio,
      location,
      profileImage
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  upgradeToSeller,
  updateProfile
};
