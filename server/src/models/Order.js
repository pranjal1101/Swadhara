const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentStatus: {
    type: String,
    enum: ['PAID'],
    default: 'PAID'
  },
  paymentMethod: {
    type: String,
    default: 'Demo Payment'
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'DELIVERED'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

OrderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `SWD-${randomHex}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
