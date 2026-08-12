const Order = require('../models/Order');
const Product = require('../models/Product');

/**
 * Place a new order
 */
const createOrder = async (userId, { items, shippingAddress }) => {
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
      price: product.price // Lock price at purchase time
    });

    totalAmount += product.price * item.quantity;
  }

  // Create order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress
  });

  return order;
};

/**
 * Get all orders placed by a customer
 */
const getUserOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate('items.product')
    .sort({ createdAt: -1 });
};

/**
 * Get all orders containing products belonging to a seller
 */
const getSellerOrders = async (sellerId) => {
  // Find seller's products
  const products = await Product.find({ seller: sellerId });
  const productIds = products.map(p => p._id);

  // Find orders that contain at least one of these products
  return await Order.find({ 'items.product': { $in: productIds } })
    .populate('user', 'name email location')
    .populate('items.product')
    .sort({ createdAt: -1 });
};

/**
 * Update order status (Sellers can update status of orders containing their products)
 */
const updateOrderStatus = async (sellerId, orderId, status) => {
  const order = await Order.findById(orderId).populate('items.product');
  if (!order) {
    throw new Error('Order not found');
  }

  // Verify that this seller owns at least one product in this order
  const isSellerProductInOrder = order.items.some(item => {
    return item.product && item.product.seller.toString() === sellerId.toString();
  });

  if (!isSellerProductInOrder) {
    throw new Error('Not authorized to update status for this order');
  }

  order.status = status;
  await order.save();

  return order;
};

module.exports = {
  createOrder,
  getUserOrders,
  getSellerOrders,
  updateOrderStatus
};
