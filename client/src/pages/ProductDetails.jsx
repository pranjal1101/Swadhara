import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

import SafeImage from '../components/SafeImage';

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Review form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    try {
      const cart = JSON.parse(localStorage.getItem('swadhara_cart')) || [];
      const existingIdx = cart.findIndex((item) => item.product === product._id);
      
      if (existingIdx > -1) {
        const newQty = cart[existingIdx].quantity + quantity;
        cart[existingIdx].quantity = Math.min(newQty, product.stock);
      } else {
        cart.push({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images && product.images[0],
          sellerName: product.seller?.name || 'Swadhara Maker',
          quantity
        });
      }

      localStorage.setItem('swadhara_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e) {
      console.error('Error saving cart item:', e);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      const response = await axios.post(`/api/products/${id}/reviews`, {
        rating,
        comment
      });

      if (response.data.success) {
        setReviewSuccess('Review added successfully!');
        setComment('');
        setRating(5);
        // Refresh product details to show new review
        fetchProductDetails();
      }
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review. You can only review a product once.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="grid grid-2" style={{ gap: '48px' }}>
          <div className="skeleton" style={{ height: '350px', width: '100%' }}></div>
          <div>
            <div className="skeleton" style={{ height: '32px', width: '60%', marginBottom: '16px' }}></div>
            <div className="skeleton" style={{ height: '20px', width: '30%', marginBottom: '32px' }}></div>
            <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '12px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container section text-center">
        <div className="alert alert-danger">{error || 'Product not found'}</div>
        <Link to="/marketplace" className="btn btn-outline" style={{ marginTop: '16px' }}>
          &larr; Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      {/* Breadcrumbs */}
      <div className="breadcrumb-nav" style={{ marginBottom: '32px' }}>
        <Link to="/marketplace" style={{ textDecoration: 'underline', color: 'var(--text-muted)' }}>
          {t('navMarketplace')}
        </Link>
        <span style={{ margin: '0 8px', color: 'var(--text-light)' }}>/</span>
        <span style={{ color: 'var(--text-main)' }}>{product.name}</span>
      </div>

      <div className="product-details-layout">
        {/* Product Image Column */}
        <div className="product-image-col">
          <div className="product-main-img-wrapper">
            <SafeImage 
              src={product.images && product.images[0]} 
              alt={product.name} 
              category={product.category?.slug}
              className="product-main-img" 
            />
          </div>
        </div>

        {/* Product Information Column */}
        <div className="product-info-col">
          <span className="badge" style={{ marginBottom: '12px' }}>
            {tDynamic(product.category?.name)}
          </span>
          <h1 className="product-details-title">{product.name}</h1>
          
          <div className="product-price-row">
            <span className="details-price">₹{product.price}</span>
            {product.stock > 0 ? (
              <span className="stock-indicator green-dot">{t('stock')} ({product.stock})</span>
            ) : (
              <span className="stock-indicator red-dot">{t('outOfStock')}</span>
            )}
          </div>

          {/* Average Rating Banner */}
          {product.numReviews > 0 && (
            <div className="product-rating-summary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.95rem' }}>
              <span style={{ color: '#d4af37', fontWeight: 'bold' }}>⭐ {product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.numReviews} ratings)</span>
            </div>
          )}

          <div className="product-desc-box">
            <p className="product-desc-text">{product.description}</p>
          </div>

          {/* Cart Quantity and Add to Cart Section */}
          {product.stock > 0 && (
            <div className="add-to-cart-controls">
              <div className="quantity-counter-widget">
                <button 
                  onClick={handleDecrement} 
                  className="counter-btn" 
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="quantity-count-number">{quantity}</span>
                <button 
                  onClick={handleIncrement} 
                  className="counter-btn" 
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>

              <button 
                onClick={handleAddToCart} 
                className={`btn ${added ? 'btn-secondary' : 'btn-primary'} add-cart-btn`}
              >
                {added ? t('addedToCart') : t('addToCart')}
              </button>
            </div>
          )}

          {/* Maker Profile Box */}
          {product.seller && (
            <div className="product-maker-profile-box">
              <h3 className="maker-box-title">Meet the Maker</h3>
              <div className="maker-box-profile-flex">
                {product.seller.profileImage && (
                  <img 
                    src={product.seller.profileImage} 
                    alt={product.seller.name} 
                    className="maker-box-avatar" 
                  />
                )}
                <div className="maker-box-details">
                  <h4 className="maker-box-name">{product.seller.name}</h4>
                  <span className="maker-box-location">{product.seller.location}</span>
                </div>
              </div>
              <p className="maker-box-bio">{product.seller.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="product-reviews-section" style={{ marginTop: '56px', borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
        <div className="grid grid-2" style={{ gap: '48px', alignItems: 'start' }}>
          
          {/* Reviews List */}
          <div className="reviews-listing-block">
            <h2 style={{ borderBottom: 'none', paddingBottom: 0, fontSize: '1.4rem', marginBottom: '24px' }}>
              Customer Reviews ({product.numReviews})
            </h2>

            {product.reviews && product.reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="reviews-list-flex" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {product.reviews.map((rev) => (
                  <div key={rev._id} className="review-item-card" style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--card-bg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600' }}>{rev.name}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ color: '#d4af37', marginBottom: '8px', fontSize: '0.85rem' }}>
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="review-write-form-block">
            <div className="sidebar-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Share your feedback</h3>

              {reviewSuccess && <div className="alert alert-success">{reviewSuccess}</div>}
              {reviewError && <div className="alert alert-danger">{reviewError}</div>}

              {user ? (
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="revRating">Rating</label>
                    <select
                      id="revRating"
                      className="form-control"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                      <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value="3">⭐⭐⭐ (3 - Average)</option>
                      <option value="2">⭐⭐ (2 - Poor)</option>
                      <option value="1">⭐ (1 - Very Bad)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '24px' }}>
                    <label className="form-label" htmlFor="revComment">Comment</label>
                    <textarea
                      id="revComment"
                      className="form-control"
                      rows="3"
                      placeholder="What did you like or dislike about this handcrafted item?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                    disabled={submittingReview}
                  >
                    {submittingReview ? t('loading') : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                  Please <Link to="/login" style={{ textDecoration: 'underline', fontWeight: '600' }}>login</Link> to write a review.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
