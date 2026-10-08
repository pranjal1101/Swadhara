const express = require('express');
const {
  listCategories,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listSellerProducts,
  createReview
} = require('../controllers/productController');
const { authenticateUser, authorizeSeller } = require('../middlewares/auth');
const { validateProduct } = require('../middlewares/validate');

const router = express.Router();

router.get('/categories', listCategories);

router.get('/seller', authenticateUser, authorizeSeller, listSellerProducts);

router.get('/', listProducts);
router.get('/:id', getProduct);

router.post('/:id/reviews', authenticateUser, createReview);

router.post('/', authenticateUser, authorizeSeller, validateProduct, createProduct);
router.put('/:id', authenticateUser, authorizeSeller, validateProduct, updateProduct);
router.delete('/:id', authenticateUser, authorizeSeller, deleteProduct);

module.exports = router;
