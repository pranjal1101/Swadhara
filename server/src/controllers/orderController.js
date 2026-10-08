const orderService = require('../services/orderService');

const checkout = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentStatus, status } = req.body;
    const order = await orderService.createOrder(req.user._id, {
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

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
  getOrderDetails,
  listUserOrders,
  listSellerOrders,
  updateStatus
};
