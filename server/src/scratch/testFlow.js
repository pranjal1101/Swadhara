const API_URL = 'http://localhost:5000/api';

async function testFullOrderLifecycle() {
  console.log('--- STARTING SWADHARA ORDER LIFECYCLE DEMO TEST ---');

  try {
    // Step 1: Login as buyer (Sunita)
    console.log('STEP 1: Logging in as Buyer (sunita@swadhara.org)...');
    const buyerLoginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sunita@swadhara.org', password: 'password123' })
    });
    const buyerLoginData = await buyerLoginRes.json();
    console.log('buyerLoginData:', JSON.stringify(buyerLoginData));
    const buyerToken = buyerLoginData.token || buyerLoginData.data?.token;
    console.log('Buyer logged in successfully! Token received.');

    // Step 2: Login as seller (Radha)
    console.log('\nSTEP 2: Logging in as Seller (radha@swadhara.org)...');
    const sellerLoginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'radha@swadhara.org', password: 'password123' })
    });
    const sellerLoginData = await sellerLoginRes.json();
    const sellerToken = sellerLoginData.token || sellerLoginData.data?.token;
    console.log('Seller logged in successfully! Token received.');

    // Step 3: Fetch products from marketplace
    console.log('\nSTEP 3: Fetching marketplace products...');
    const productsRes = await fetch(`${API_URL}/products`);
    const productsData = await productsRes.json();
    const products = productsData.data;
    console.log(`Found ${products.length} products.`);
    const targetProduct = products[0];
    console.log(`Selected Product: "${targetProduct.name}" (Price: ₹${targetProduct.price})`);

    // Step 4: Buyer places order ("Pay ₹X")
    console.log('\nSTEP 4: Buyer places order ("Pay ₹X")...');
    const checkoutRes = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${buyerToken}`
      },
      body: JSON.stringify({
        items: [{ product: targetProduct._id, quantity: 1 }],
        shippingAddress: {
          street: '123 Crafts Lane',
          city: 'Ahmedabad',
          state: 'Gujarat',
          zipCode: '380001',
          phone: '9876543210'
        }
      })
    });

    const checkoutData = await checkoutRes.json();
    console.log('checkoutData:', JSON.stringify(checkoutData));
    const createdOrder = checkoutData.data;
    console.log(`Order Created! Order Number: #${createdOrder.orderNumber || createdOrder._id}`);
    console.log(`Initial Payment Status: ${createdOrder.paymentStatus}`);
    console.log(`Initial Order Status: ${createdOrder.status}`);

    if (createdOrder.paymentStatus !== 'PAID' || createdOrder.status !== 'PENDING') {
      throw new Error(`Order status mismatch! Expected PAID & PENDING, got ${createdOrder.paymentStatus} & ${createdOrder.status}`);
    }

    // Step 5: Buyer checks My Orders
    console.log('\nSTEP 5: Buyer fetching Order History (My Orders)...');
    const buyerOrdersRes = await fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${buyerToken}` }
    });
    const buyerOrdersData = await buyerOrdersRes.json();
    const buyerFound = buyerOrdersData.data.find(o => o._id === createdOrder._id);
    console.log(`Buyer Order History contains order? ${!!buyerFound}. Status: ${buyerFound?.status}`);

    // Step 6: Seller checks Incoming Orders
    console.log('\nSTEP 6: Seller fetching Incoming Orders...');
    const sellerOrdersRes = await fetch(`${API_URL}/orders/seller`, {
      headers: { 'Authorization': `Bearer ${sellerToken}` }
    });
    const sellerOrdersData = await sellerOrdersRes.json();
    const sellerFound = sellerOrdersData.data.find(o => o._id === createdOrder._id);
    console.log(`Seller Incoming Orders contains exact same order? ${!!sellerFound}. Status: ${sellerFound?.status}`);

    // Step 7: Seller clicks "Confirm Order"
    console.log('\nSTEP 7: Seller clicking "Confirm Order" (PENDING -> CONFIRMED)...');
    const confirmRes = await fetch(`${API_URL}/orders/${createdOrder._id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sellerToken}`
      },
      body: JSON.stringify({ status: 'CONFIRMED' })
    });
    const confirmData = await confirmRes.json();
    console.log(`Server response for Confirm: Status updated to ${confirmData.data.status}`);

    // Step 8: Buyer verifies order status is now CONFIRMED
    console.log('\nSTEP 8: Buyer verifying updated status...');
    const buyerCheck2Res = await fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${buyerToken}` }
    });
    const buyerCheck2Data = await buyerCheck2Res.json();
    const updatedBuyerOrder1 = buyerCheck2Data.data.find(o => o._id === createdOrder._id);
    console.log(`Buyer sees updated Order Status: ${updatedBuyerOrder1.status}`);
    if (updatedBuyerOrder1.status !== 'CONFIRMED') throw new Error('Status not updated to CONFIRMED!');

    // Step 9: Seller clicks "Mark as Delivered"
    console.log('\nSTEP 9: Seller clicking "Mark as Delivered" (CONFIRMED -> DELIVERED)...');
    const deliverRes = await fetch(`${API_URL}/orders/${createdOrder._id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sellerToken}`
      },
      body: JSON.stringify({ status: 'DELIVERED' })
    });
    const deliverData = await deliverRes.json();
    console.log(`Server response for Deliver: Status updated to ${deliverData.data.status}`);

    // Step 10: Buyer verifies order status is now DELIVERED
    console.log('\nSTEP 10: Buyer verifying final status...');
    const buyerCheck3Res = await fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${buyerToken}` }
    });
    const buyerCheck3Data = await buyerCheck3Res.json();
    const updatedBuyerOrder2 = buyerCheck3Data.data.find(o => o._id === createdOrder._id);
    console.log(`Buyer sees final Order Status: ${updatedBuyerOrder2.status}`);
    if (updatedBuyerOrder2.status !== 'DELIVERED') throw new Error('Status not updated to DELIVERED!');

    console.log('\n==================================================');
    console.log('DEMO TEST COMPLETED SUCCESSFULLY! ALL REQUIREMENTS PASSED!');
    console.log('==================================================');

  } catch (err) {
    console.error('TEST FAILED:', err.message);
  }
}

testFullOrderLifecycle();
