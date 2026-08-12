const productService = require('../services/productService');

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const listCategories = async (req, res, next) => {
  try {
    const categories = await productService.getCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get products (with search, category filter, sort)
 * @route   GET /api/products
 * @access  Public
 */
const listProducts = async (req, res, next) => {
  try {
    const { search, category, sort } = req.query;
    const products = await productService.getProducts({ search, category, sort });
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single product details
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private (Seller only)
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private (Seller only, owner checks apply)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.user._id, req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private (Seller only, owner checks apply)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get seller's own products
 * @route   GET /api/seller/products
 * @access  Private (Seller only)
 */
const listSellerProducts = async (req, res, next) => {
  try {
    const products = await productService.getSellerProducts(req.user._id);
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCategories,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listSellerProducts
};
