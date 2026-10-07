require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const authService = require('../services/authService');
const productService = require('../services/productService');
const orderService = require('../services/orderService');

const runTest = async () => {
  console.log('=== STARTING DATABASE PERSISTENCE VERIFICATION TEST ===');
  
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swadhara';
  console.log('Connecting to database:', mongoUri);
  await mongoose.connect(mongoUri);

  const emailA = `seller_a_${Date.now()}@swadhara.org`;
  const emailB = `buyer_b_${Date.now()}@swadhara.org`;
  const pass = 'password123';

  // 1. Create Account A & upgrade to seller
  console.log('\n--- STEP 1: Creating Account A ---');
  const userA = await authService.registerUser({ name: 'Seller A', email: emailA, password: pass });
  const sellerA = await authService.upgradeUserToSeller(userA._id);
  console.log('Registered & Upgraded Seller A:', sellerA._id, sellerA.email, sellerA.role);

  // 2. Create Product under Account A
  console.log('\n--- STEP 2: Creating Product under Account A ---');
  let category = await Category.findOne({});
  if (!category) {
    category = await Category.create({ name: { en: 'Test Cat' }, slug: 'test-cat', image: 'test.jpg' });
  }
  const productA = await productService.createProduct(sellerA._id, {
    name: 'Handmade Craft Item by Seller A',
    description: 'Special persistent test product',
    price: 999,
    category: category._id,
    stock: 5,
    images: ['/images/embroidery.png']
  });
  console.log('Product created:', productA._id, productA.name);

  // 3. Create Account B
  console.log('\n--- STEP 3: Creating Account B ---');
  const userB = await authService.registerUser({ name: 'Buyer B', email: emailB, password: pass });
  console.log('Registered Buyer B:', userB._id, userB.email);

  // 4. Account B places order for Account A\'s product
  console.log('\n--- STEP 4: Buyer B placing order for Seller A\'s product ---');
  const orderB = await orderService.createOrder(userB._id, {
    items: [{ product: productA._id, quantity: 1 }],
    shippingAddress: {
      street: '123 Craft Lane',
      city: 'Jaipur',
      state: 'Rajasthan',
      zipCode: '302001',
      phone: '9876543210'
    }
  });
  console.log('Order created:', orderB._id, orderB.orderNumber, 'Total:', orderB.totalAmount);

  // 5. Simulate Server Stop / Restart (Disconnect Mongoose)
  console.log('\n--- STEP 5: SIMULATING COMPLETE BACKEND STOP & RESTART ---');
  await mongoose.disconnect();
  console.log('MongoDB disconnected (Server stopped).');

  // Wait 1 second
  await new Promise(r => setTimeout(r, 1000));

  console.log('\n--- STEP 6: BACKEND RESTARTING ---');
  await mongoose.connect(mongoUri);
  console.log('MongoDB reconnected (Server started).');

  // 6. Verify Account A persistence
  console.log('\n--- STEP 7: Verifying Account A & Product Persistence ---');
  const fetchedUserA = await User.findOne({ email: emailA });
  if (!fetchedUserA) throw new Error('FAIL: Account A not found after server restart!');
  console.log('SUCCESS: Account A found in MongoDB:', fetchedUserA.name, fetchedUserA.email);

  const fetchedProductA = await Product.findById(productA._id);
  if (!fetchedProductA) throw new Error('FAIL: Product A not found after server restart!');
  console.log('SUCCESS: Product A found in MongoDB:', fetchedProductA.name, 'Price:', fetchedProductA.price);

  // 7. Verify Account B persistence
  console.log('\n--- STEP 8: Verifying Account B & Order Persistence ---');
  const fetchedUserB = await User.findOne({ email: emailB });
  if (!fetchedUserB) throw new Error('FAIL: Account B not found after server restart!');
  console.log('SUCCESS: Account B found in MongoDB:', fetchedUserB.name, fetchedUserB.email);

  const fetchedOrderB = await Order.findById(orderB._id);
  if (!fetchedOrderB) throw new Error('FAIL: Order B not found after server restart!');
  console.log('SUCCESS: Order B found in MongoDB:', fetchedOrderB.orderNumber, 'Status:', fetchedOrderB.status);

  console.log('\n=== ALL PERSISTENCE TESTS PASSED CLEANLY! ===');

  await mongoose.disconnect();
  process.exit(0);
};

runTest().catch(err => {
  console.error('PERSISTENCE TEST FAILED:', err);
  process.exit(1);
});
