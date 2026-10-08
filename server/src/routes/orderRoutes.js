const express = require('express');
const {
  checkout,
  getOrderDetails,
  listUserOrders,
  listSellerOrders,
  updateStatus
} = require('../controllers/orderController');
const { authenticateUser, authorizeSeller } = require('../middlewares/auth');
const { validateOrder } = require('../middlewares/validate');

const router = express.Router();

router.post('/', authenticateUser, validateOrder, checkout);
router.get('/', authenticateUser, listUserOrders);

router.get('/seller', authenticateUser, authorizeSeller, listSellerOrders);

router.get('/:id', authenticateUser, getOrderDetails);

router.put('/:id/status', authenticateUser, authorizeSeller, updateStatus);

module.exports = router;
