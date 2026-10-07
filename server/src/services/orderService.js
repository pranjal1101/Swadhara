const Order = require('../models/Order');
const Product = require('../models/Product');

/**
 * Place a new order with demo payment
 */
const createOrder = async (userId, { items, shippingAddress, paymentMethod, paymentStatus, status }) => {
  if (!items || items.length === 0) {
    throw new Error('No items in the order');
  }
  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.phone) {
    throw new Error('Please provide complete shipping details');
  }

  const orderItems = [];
  let totalAmount = 0;

  // Process items, check stock and decrement
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stock}`);
    }

    // Decrement stock
    product.stock -= item.quantity;
    await product.save();

    // Add to items list with historical price
    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price
    });

    totalAmount += product.price * item.quantity;
  }

  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  const orderNumber = `SWD-${randomHex}`;

  // Create order
  const order = await Order.create({
    orderNumber,
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paymentStatus: 'PAID',
    paymentMethod: 'Demo Payment',
    status: 'PENDING'
  });

  return await Order.findById(order._id)
    .populate({
      path: 'items.product',
      populate: { path: 'seller', select: 'name email profileImage location' }
    })
    .populate('user', 'name email location');
};

/**
 * Get all orders placed by a customer
 */
const getUserOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate({
      path: 'items.product',
      populate: { path: 'seller', select: 'name email profileImage location' }
    })
    .populate('user', 'name email location')
    .sort({ createdAt: -1 });
};

/**
 * Get single order details by ID
 */
const getOrderById = async (orderId) => {
  return await Order.findById(orderId)
    .populate({
      path: 'items.product',
      populate: { path: 'seller', select: 'name email profileImage location' }
    })
    .populate('user', 'name email location');
};

/**
 * Get all orders containing products belonging to a seller
 */
const getSellerOrders = async (sellerId) => {
  const products = await Product.find({ seller: sellerId });
  const productIds = products.map(p => p._id);

  return await Order.find({ 'items.product': { $in: productIds } })
    .populate({
      path: 'items.product',
      populate: { path: 'seller', select: 'name email profileImage location' }
    })
    .populate('user', 'name email location')
    .sort({ createdAt: -1 });
};

/**
 * Update order status (Sellers can update status of orders containing their products)
 * State machine allows only: PENDING -> CONFIRMED -> DELIVERED
 */
const updateOrderStatus = async (sellerId, orderId, status) => {
  const allowedStatuses = ['CONFIRMED', 'DELIVERED'];
  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid order status. Allowed states are CONFIRMED or DELIVERED');
  }

  const order = await Order.findById(orderId).populate('items.product');
  if (!order) {
    throw new Error('Order not found');
  }

  const isSellerProductInOrder = order.items.some(item => {
    return item.product && item.product.seller && item.product.seller.toString() === sellerId.toString();
  });

  if (!isSellerProductInOrder) {
    throw new Error('Not authorized to update status for this order');
  }

  // Validate state transitions
  if (order.status === 'PENDING' && status !== 'CONFIRMED') {
    throw new Error('Pending order can only be updated to CONFIRMED');
  }
  if (order.status === 'CONFIRMED' && status !== 'DELIVERED') {
    throw new Error('Confirmed order can only be updated to DELIVERED');
  }
  if (order.status === 'DELIVERED') {
    throw new Error('Delivered order lifecycle is completed and cannot be updated');
  }

  order.status = status;
  await order.save();

  return await Order.findById(order._id)
    .populate({
      path: 'items.product',
      populate: { path: 'seller', select: 'name email profileImage location' }
    })
    .populate('user', 'name email location');
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus
};
