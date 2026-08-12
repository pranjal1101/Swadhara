const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { ROLES } = require('../constants');

/**
 * Register a new user
 * Note: Role is hardcoded to "user" on signup to satisfy security requirements.
 */
const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('A user with this email already exists');
  }

  // Create user with default role: 'user'
  const user = await User.create({
    name,
    email,
    password,
    role: ROLES.USER
  });

  const token = generateToken(user._id);

  // Return user details and token (excluding password)
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    bio: user.bio,
    location: user.location,
    token
  };
};

/**
 * Login an existing user
 */
const loginUser = async ({ email, password }) => {
  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  // Return user info and token
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    bio: user.bio,
    location: user.location,
    token
  };
};

/**
 * Get user profile details
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

/**
 * Upgrade user to seller
 */
const upgradeUserToSeller = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  user.role = ROLES.SELLER;
  await user.save();

  // Return user profile (excluding password)
  return await User.findById(userId).select('-password');
};

/**
 * Update user profile details
 */
const updateUserProfile = async (userId, { name, bio, location, profileImage }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (name) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (location !== undefined) user.location = location;
  if (profileImage !== undefined) user.profileImage = profileImage;

  await user.save();
  return await User.findById(userId).select('-password');
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  upgradeUserToSeller,
  updateUserProfile
};
