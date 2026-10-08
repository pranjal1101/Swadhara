const Product = require('../models/Product');
const Category = require('../models/Category');

const getCategories = async () => {
  return await Category.find({});
};

const getProducts = async ({ search, category, sort }) => {
  let query = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (category) {
    if (category.match(/^[0-9a-fA-F]{24}$/)) {
      query.category = category;
    } else {
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        query.category = cat._id;
      } else {
        return [];
      }
    }
  }

  let dbQuery = Product.find(query)
    .populate('category')
    .populate('seller', 'name profileImage location');

  if (sort === 'price-asc') {
    dbQuery = dbQuery.sort({ price: 1 });
  } else if (sort === 'price-desc') {
    dbQuery = dbQuery.sort({ price: -1 });
  } else {
    dbQuery = dbQuery.sort({ createdAt: -1 });
  }

  return await dbQuery;
};

const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate('category')
    .populate('seller', 'name profileImage location bio');

  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

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

const updateProduct = async (sellerId, productId, updateData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.seller.toString() !== sellerId.toString()) {
    throw new Error('Not authorized to edit this product');
  }

  const allowedFields = ['name', 'description', 'price', 'category', 'images', 'stock'];
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      product[field] = updateData[field];
    }
  });

  await product.save();
  return product;
};

const deleteProduct = async (sellerId, productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.seller.toString() !== sellerId.toString()) {
    throw new Error('Not authorized to delete this product');
  }

  await Product.findByIdAndDelete(productId);
  return { message: 'Product deleted successfully' };
};

const getSellerProducts = async (sellerId) => {
  return await Product.find({ seller: sellerId }).populate('category');
};

const addProductReview = async (productId, userId, userName, { rating, comment }) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const alreadyReviewed = product.reviews.find(
    r => r.user.toString() === userId.toString()
  );

  if (alreadyReviewed) {
    throw new Error('Product already reviewed by you');
  }

  const review = {
    user: userId,
    name: userName,
    rating: Number(rating),
    comment
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  product.rating = Number((totalRating / product.reviews.length).toFixed(1));

  await product.save();
  return product;
};

module.exports = {
  getCategories,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  addProductReview
};
