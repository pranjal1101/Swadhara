const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { ROLES } = require('../constants');

const registerUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('A user with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: ROLES.USER
  });

  const token = generateToken(user._id);

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

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

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

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const upgradeUserToSeller = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.role = ROLES.SELLER;
  await user.save();

  return await User.findById(userId).select('-password');
};

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
