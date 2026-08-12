/**
 * Swadhara Request Validation Middleware
 */

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name, price, category, stock } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Product name is required' });
  }

  if (price === undefined || isNaN(price) || price < 0) {
    return res.status(400).json({ success: false, message: 'Please provide a valid positive price' });
  }

  if (!category) {
    return res.status(400).json({ success: false, message: 'Category is required' });
  }

  if (stock === undefined || isNaN(stock) || stock < 0) {
    return res.status(400).json({ success: false, message: 'Please provide a valid positive stock quantity' });
  }

  next();
};

const validateOrder = (req, res, next) => {
  const { items, shippingAddress } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Please add items to your order' });
  }

  if (!shippingAddress) {
    return res.status(400).json({ success: false, message: 'Shipping address is required' });
  }

  const requiredFields = ['street', 'city', 'state', 'zipCode', 'phone'];
  const missing = requiredFields.filter(field => !shippingAddress[field] || shippingAddress[field].trim() === '');

  if (missing.length > 0) {
    return res.status(400).json({ success: false, message: `Please fill all shipping fields: ${missing.join(', ')}` });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateOrder
};
