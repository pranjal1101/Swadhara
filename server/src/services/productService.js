const Product = require('../models/Product');
const Category = require('../models/Category');

/**
 * Get all categories
 */
const getCategories = async () => {
  return await Category.find({});
};

/**
 * Get products with search, category filtering, and sorting
 */
const getProducts = async ({ search, category, sort }) => {
  let query = {};

  // Search filter
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  // Category filter (supports slug or ID)
  if (category) {
    // If it looks like a Mongo ID, use it directly, otherwise lookup by slug
    if (category.match(/^[0-9a-fA-F]{24}$/)) {
      query.category = category;
    } else {
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        query.category = cat._id;
      } else {
        return []; // Category not found, return empty
      }
    }
  }

  let dbQuery = Product.find(query)
    .populate('category')
    .populate('seller', 'name profileImage location');

  // Sorting
  if (sort === 'price-asc') {
    dbQuery = dbQuery.sort({ price: 1 });
  } else if (sort === 'price-desc') {
    dbQuery = dbQuery.sort({ price: -1 });
  } else {
    dbQuery = dbQuery.sort({ createdAt: -1 }); // Default latest
  }

  return await dbQuery;
};

/**
 * Get a single product by ID
 */
const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate('category')
    .populate('seller', 'name profileImage location bio');
    
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

/**
 * Create a new product (Sellers only)
 */
const createProduct = async (sellerId, productData) => {
  const { name, description, price, category, images, stock } = productData;

  if (!name || !price || !category || !stock) {
    throw new Error('Please fill all required fields');
  }

  const product = await Product.create({
    seller: sellerId,
    name,
    description,
    price,
    category,
    images: images && images.length > 0 ? images : ['https://via.placeholder.com/400x300'],
    stock
  });

  return product;
};

/**
 * Update an existing product (Sellers only, checks ownership)
 */
const updateProduct = async (sellerId, productId, updateData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check ownership
  if (product.seller.toString() !== sellerId.toString()) {
    throw new Error('Not authorized to edit this product');
  }

  // Update fields
  const allowedFields = ['name', 'description', 'price', 'category', 'images', 'stock'];
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      product[field] = updateData[field];
    }
  });

  await product.save();
  return product;
};

/**
 * Delete a product (Sellers only, checks ownership)
 */
const deleteProduct = async (sellerId, productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check ownership
  if (product.seller.toString() !== sellerId.toString()) {
    throw new Error('Not authorized to delete this product');
  }

  await Product.findByIdAndDelete(productId);
  return { message: 'Product deleted successfully' };
};

/**
 * Get all products belonging to a seller
 */
const getSellerProducts = async (sellerId) => {
  return await Product.find({ seller: sellerId }).populate('category');
};

module.exports = {
  getCategories,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts
};
