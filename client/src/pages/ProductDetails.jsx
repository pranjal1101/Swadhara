import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { t, tDynamic } = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
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

    fetchProduct();
  }, [id]);

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
      // Get current cart from localStorage
      const cart = JSON.parse(localStorage.getItem('swadhara_cart')) || [];
      
      // Check if product is already in the cart
      const existingIdx = cart.findIndex((item) => item.product === product._id);
      
      if (existingIdx > -1) {
        // Update quantity (cap by stock)
        const newQty = cart[existingIdx].quantity + quantity;
        cart[existingIdx].quantity = Math.min(newQty, product.stock);
      } else {
        // Add new item
        cart.push({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images && product.images[0],
          sellerName: product.seller?.name || 'Swadhara Maker',
          quantity
        });
      }

      // Save to localStorage
      localStorage.setItem('swadhara_cart', JSON.stringify(cart));
      
      // Dispatch custom event to let navbar know to refresh badge
      window.dispatchEvent(new Event('cart-updated'));

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e) {
      console.error('Error saving cart item:', e);
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
            <img 
              src={product.images && product.images[0]} 
              alt={product.name} 
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
    </div>
  );
}
