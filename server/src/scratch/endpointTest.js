/**
 * Swadhara Backend API Endpoints Integration Test Script
 * Runs using Node's native http module (Zero dependencies)
 */
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('../app'); // Import express app instance

const PORT = 5099;
let serverInstance;

// Setup test helper to make HTTP requests programmatically
const makeRequest = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    
    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(postData);
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('--- STARTING SWADHARA API ENDPOINT TESTS ---');

  try {
    // 1. Start test server
    serverInstance = app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}`);
    });

    // Wait 500ms for MongoDB connection
    await new Promise(r => setTimeout(r, 500));

    // 2. Test GET /api/products/categories (Public)
    console.log('\n[Test 1] Fetch categories list...');
    const catRes = await makeRequest('GET', '/api/products/categories');
    if (catRes.status === 200 && catRes.body.success === true) {
      console.log('✅ PASS: Categories fetched successfully. Count:', catRes.body.data?.length);
    } else {
      console.log('❌ FAIL:', catRes.status, catRes.body);
    }

    // 3. Test GET /api/courses (Public)
    console.log('\n[Test 2] Fetch courses list...');
    const courseRes = await makeRequest('GET', '/api/courses');
    if (courseRes.status === 200 && courseRes.body.success === true) {
      console.log('✅ PASS: Courses fetched successfully. Count:', courseRes.body.data?.length);
    } else {
      console.log('❌ FAIL:', courseRes.status, courseRes.body);
    }

    // 4. Test GET /api/products (Public)
    console.log('\n[Test 3] Fetch products list...');
    const prodRes = await makeRequest('GET', '/api/products');
    if (prodRes.status === 200 && prodRes.body.success === true) {
      console.log('✅ PASS: Products fetched successfully. Count:', prodRes.body.data?.length);
    } else {
      console.log('❌ FAIL:', prodRes.status, prodRes.body);
    }

    // 5. Test POST /api/auth/login with invalid credentials (Negative test)
    console.log('\n[Test 4] Login with incorrect credentials...');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'nonexistent@swadhara.org',
      password: 'wrongpassword'
    });
    if (loginRes.status === 401 && loginRes.body.success === false) {
      console.log('✅ PASS: Authentication rejected correctly with status 401.');
    } else {
      console.log('❌ FAIL:', loginRes.status, loginRes.body);
    }

    console.log('\n--- ALL TEST SUITES EXECUTED ---');
  } catch (error) {
    console.error('Testing runtime error:', error);
  } finally {
    // Shutdown server and MongoDB connection cleanly
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('Test server shut down successfully.');
      });
    }
    mongoose.connection.close();
  }
};

runTests();
