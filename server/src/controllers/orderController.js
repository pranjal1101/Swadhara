const orderService = require('../services/orderService');

/**
 * @desc    Create a new order from checkout
 * @route   POST /api/orders
 * @access  Private (Authenticated users)
 */
const checkout = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    const order = await orderService.createOrder(req.user._id, { items, shippingAddress });
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user order history
 * @route   GET /api/orders
 * @access  Private (Authenticated users)
 */
const listUserOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user._id);
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get orders containing seller's products
 * @route   GET /api/seller/orders
 * @access  Private (Seller only)
 */
const listSellerOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getSellerOrders(req.user._id);
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update status of an order
 * @route   PUT /api/orders/:id/status
 * @access  Private (Seller only)
 */
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }

    const order = await orderService.updateOrderStatus(req.user._id, orderId, status);
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
  listUserOrders,
  listSellerOrders,
  updateStatus
};
