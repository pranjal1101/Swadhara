const productService = require('../services/productService');

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

const createReview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    const userName = req.user.name;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please add a rating and comment' });
    }

    const product = await productService.addProductReview(productId, userId, userName, {
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: product
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
  listSellerProducts,
  createReview
};
