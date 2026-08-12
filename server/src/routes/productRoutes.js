const express = require('express');
const {
  listCategories,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listSellerProducts
} = require('../controllers/productController');
const { authenticateUser, authorizeSeller } = require('../middlewares/auth');

const router = express.Router();

// Categories listing (Public)
router.get('/categories', listCategories);

// Seller products portfolio (Protected, Seller only)
// Note: Mount this BEFORE the /:id parameter route to avoid route matching conflicts
router.get('/seller', authenticateUser, authorizeSeller, listSellerProducts);

// Public product browsing routes
router.get('/', listProducts);
router.get('/:id', getProduct);

// Protected product management (Seller only)
router.post('/', authenticateUser, authorizeSeller, createProduct);
router.put('/:id', authenticateUser, authorizeSeller, updateProduct);
router.delete('/:id', authenticateUser, authorizeSeller, deleteProduct);

module.exports = router;
