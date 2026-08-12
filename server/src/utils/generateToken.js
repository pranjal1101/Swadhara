const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'swadhara_dev_jwt_secret_9823482347', {
    expiresIn: '30d'
  });
};

module.exports = generateToken;
