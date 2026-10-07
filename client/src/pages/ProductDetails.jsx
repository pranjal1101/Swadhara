import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Heart, Share2, Star, ChevronRight, Check, Minus, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) return;
    handleAddToCart();
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      const response = await axios.post(`/api/products/${id}/reviews`, {
        rating: Number(rating),
        comment
      });

      if (response.data.success) {
        setReviewSuccess('Review added successfully!');
        setComment('');
        setRating(5);
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
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '28px' }}>
        <Link to="/marketplace" style={{ color: 'var(--text-muted)' }}>Marketplace</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-muted)' }}>{tDynamic(product.category?.name)}</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--primary-dark)', fontWeight: '600' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', marginBottom: '56px' }}>
        {/* Product Image Gallery */}
        <div>
          <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', height: '420px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-subtle)', backgroundColor: '#FFFFFF' }}>
            <SafeImage
              src={product.images && product.images[0]}
              alt={product.name}
              category={product.category?.slug}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Product Details Column (Panel 7 Reference) */}
        <div>
          <span className="badge-tag" style={{ marginBottom: '12px' }}>
            {tDynamic(product.category?.name)}
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
              ₹{product.price}
            </span>
            {product.stock > 0 ? (
              <span className="stock-in">In stock ({product.stock} available)</span>
            ) : (
              <span className="stock-out">Out of Stock</span>
            )}
          </div>

          {/* Maker Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--bg-pink-soft)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', marginBottom: '24px' }}>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              alt={product.seller?.name || 'Maker'}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: '600' }}>
              Made by {product.seller?.name || 'Meena Sharma'} &bull; Embroidery & Handicrafts
            </span>
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '28px' }}>
            {product.description}
          </p>

          {/* Add to Cart Actions */}
          {product.stock > 0 && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
              {/* Quantity Counter */}
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', height: '48px', backgroundColor: '#FFFFFF' }}>
                <button onClick={handleDecrement} disabled={quantity <= 1} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={16} />
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: '700', fontSize: '1rem' }}>{quantity}</span>
                <button onClick={handleIncrement} disabled={quantity >= product.stock} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn ${added ? 'btn-secondary' : 'btn-outline'} btn-lg`}
                style={{ flex: 1 }}
              >
                {added ? <><Check size={18} /> Added</> : <><ShoppingBag size={18} /> Add to Cart</>}
              </button>

              <button
                onClick={handleBuyNow}
                className="btn btn-rose btn-lg"
                style={{ flex: 1, fontWeight: '700' }}
              >
                Buy Now
              </button>

              <button className="icon-action-btn" style={{ width: '48px', height: '48px', border: '1px solid var(--border-subtle)' }}>
                <Heart size={20} style={{ color: 'var(--primary-rose-dark)' }} />
              </button>
            </div>
          )}

          {/* MEET THE CREATOR SPOTLIGHT CARD (Panel 7 Reference) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--border-radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                alt={product.seller?.name || 'Creator'}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', display: 'block' }}>Meet the creator</span>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.98rem', color: 'var(--primary-dark)' }}>{product.seller?.name || 'Meena Sharma'}</h4>
              </div>
            </div>
            <button onClick={() => navigate('/profile')} className="btn btn-outline btn-sm">
              View profile &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS & RATINGS SECTION */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Customer Reviews ({product.numReviews})</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
          {/* Reviews List */}
          <div>
            {product.reviews && product.reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {product.reviews.map((rev) => (
                  <div key={rev._id} className="card-editorial" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{rev.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {/* SVG Rating Stars */}
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px', color: '#D4AF37' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={14} fill={star <= rev.rating ? '#D4AF37' : 'none'} stroke="#D4AF37" />
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-main)' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write a Review Box */}
          <div className="card-pink-surface" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Write a Review</h3>

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
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Very Good</option>
                    <option value="3">3 Stars - Average</option>
                    <option value="2">2 Stars - Poor</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="revComment">Your Review</label>
                  <textarea
                    id="revComment"
                    className="form-control"
                    rows="3"
                    placeholder="Share your experience with this handcrafted creation..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                Please <Link to="/login" style={{ fontWeight: '700', textDecoration: 'underline' }}>Sign In</Link> to post a product review.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
