const express = require('express');
const {
  checkout,
  listUserOrders,
  listSellerOrders,
  updateStatus
} = require('../controllers/orderController');
const { authenticateUser, authorizeSeller } = require('../middlewares/auth');
const { validateOrder } = require('../middlewares/validate');

const router = express.Router();

// Learner order placement and history (Protected, any authenticated user)
router.post('/', authenticateUser, validateOrder, checkout);
router.get('/', authenticateUser, listUserOrders);

// Seller incoming orders and fulfillment (Protected, Seller only)
router.get('/seller', authenticateUser, authorizeSeller, listSellerOrders);
router.put('/:id/status', authenticateUser, authorizeSeller, updateStatus);

module.exports = router;
