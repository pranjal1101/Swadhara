import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function SellerDashboard() {
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, form
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Product Form states
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [submittingForm, setSubmittingForm] = useState(false);

  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const [prodsRes, ordersRes, catsRes] = await Promise.all([
        axios.get('/api/products/seller'),
        axios.get('/api/orders/seller'),
        axios.get('/api/products/categories')
      ]);

      if (prodsRes.data.success) setProducts(prodsRes.data.data);
      if (ordersRes.data.success) setOrders(ordersRes.data.data);
      if (catsRes.data.success) setCategories(catsRes.data.data);
    } catch (err) {
      console.error('Error fetching seller panel data:', err);
      setErrorMsg('Failed to load seller panel information.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateForm = () => {
    setEditMode(false);
    setSelectedProductId(null);
    setProdName('');
    setProdDesc('');
    setProdCategory(categories[0]?._id || '');
    setProdPrice('');
    setProdStock('');
    setProdImage('');
    setActiveTab('form');
  };

  const handleOpenEditForm = (product) => {
    setEditMode(true);
    setSelectedProductId(product._id);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdCategory(product.category?._id || product.category || '');
    setProdPrice(product.price);
    setProdStock(product.stock);
    setProdImage(product.images?.[0] || '');
    setActiveTab('form');
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.data.success) {
        setSuccessMsg(response.data.message);
        // Refresh products list
        setProducts(products.filter(p => p._id !== productId));
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to delete product.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmittingForm(true);
    setErrorMsg('');
    setSuccessMsg('');

    const payload = {
      name: prodName,
      description: prodDesc,
      category: prodCategory,
      price: Number(prodPrice),
      stock: Number(prodStock),
      images: prodImage ? [prodImage] : []
    };

    try {
      let response;
      if (editMode) {
        response = await axios.put(`/api/products/${selectedProductId}`, payload);
      } else {
        response = await axios.post('/api/products', payload);
      }

      if (response.data.success) {
        setSuccessMsg(response.data.message);
        await fetchSellerData(); // Re-fetch all seller products
        setActiveTab('products');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit product details.');
    } finally {
      setSubmittingForm(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      if (response.data.success) {
        setSuccessMsg('Order status updated successfully');
        // Refresh orders list
        setOrders(orders.map(order => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        }));
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update order status.');
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '80px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '300px', width: '100%' }}></div>
      </div>
    );
  }

  return (
    <div className="container section">
      {/* Seller Header Row */}
      <div className="seller-header-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>{t('sellerWelcome')}, {user?.name}</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-light)' }}> जयपुर क्राफ्ट्स एंड क्रिएशन्स </p>
        </div>
        <div>
          <button onClick={handleOpenCreateForm} className="btn btn-primary btn-sm">
            &#43; {t('sellerAddProduct')}
          </button>
        </div>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {/* Tabs Switcher Navigation */}
      <div className="seller-tabs-container" style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          className={`seller-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          {t('sellerOverview')}
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`seller-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
        >
          {t('sellerMyProducts')} ({products.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`seller-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          {t('sellerIncomingOrders')} ({orders.length})
        </button>
      </div>

      {/* Tab Panel 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-2" style={{ gap: '32px' }}>
          <div className="sidebar-card text-center" style={{ padding: '36px' }}>
            <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>
              {products.length}
            </span>
            <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Creations Listed</span>
          </div>
          <div className="sidebar-card text-center" style={{ padding: '36px' }}>
            <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>
              {orders.length}
            </span>
            <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Incoming Sales Orders</span>
          </div>
        </div>
      )}

      {/* Tab Panel 2: Product Management Table */}
      {activeTab === 'products' && (
        <div className="seller-products-panel">
          {products.length === 0 ? (
            <div className="empty-state-box" style={{ padding: '48px 24px' }}>
              <p style={{ marginBottom: '16px' }}>{t('noData')}</p>
              <button onClick={handleOpenCreateForm} className="btn btn-primary btn-sm">
                Add Your First Creation
              </button>
            </div>
          ) : (
            <div className="seller-items-table-container">
              <table className="seller-items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="table-product-cell">
                        <img src={product.images?.[0]} alt={product.name} className="table-product-thumb" />
                        <span className="table-product-name">{product.name}</span>
                      </td>
                      <td>{tDynamic(product.category?.name)}</td>
                      <td style={{ fontWeight: '500' }}>₹{product.price}</td>
                      <td>
                        <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                          {product.stock > 0 ? product.stock : t('outOfStock')}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleOpenEditForm(product)} 
                            className="btn btn-secondary btn-sm"
                            style={{ minHeight: 'auto', padding: '6px 12px' }}
                          >
                            {t('edit')}
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product._id)} 
                            className="btn btn-outline btn-sm"
                            style={{ minHeight: 'auto', padding: '6px 12px', borderColor: 'var(--error-color)', color: 'var(--error-color)' }}
                          >
                            {t('delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab Panel 3: Seller Incoming Orders */}
      {activeTab === 'orders' && (
        <div className="seller-orders-panel">
          {orders.length === 0 ? (
            <div className="empty-state-box" style={{ padding: '48px 24px' }}>
              <p>Your sales orders will appear here.</p>
            </div>
          ) : (
            <div className="seller-orders-list" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {orders.map((order) => {
                // Filter items to show only products belonging to this seller
                const sellerItems = order.items.filter(item => {
                  return item.product && item.product.seller === user._id;
                });

                return (
                  <div key={order._id} className="order-summary-card">
                    <div className="order-summary-header">
                      <div>
                        <span className="order-id-label">Order ID: #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                        <span className="order-date-text">
                          Customer: {order.user?.name} &bull; Date: {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <select
                          className={`form-control filter-select status-select-dropdown ${order.status}`}
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                          style={{ minHeight: '38px', padding: '6px 12px' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="order-summary-items">
                      {sellerItems.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <div className="order-item-main">
                            <span className="order-item-name">{item.product ? item.product.name : 'Unknown Creation'}</span>
                            <span className="order-item-qty">Quantity Ordered: {item.quantity}</span>
                          </div>
                          <span className="order-item-price">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-summary-footer">
                      <div>
                        <span className="shipping-label">Deliver To:</span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>
                          Contact: {order.shippingAddress?.phone} <br />
                          {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}
                        </p>
                      </div>
                      <div className="order-total-amount">
                        <span className="total-label">Subtotal from you:</span>
                        <span className="total-value" style={{ fontSize: '1.15rem' }}>
                          ₹{sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Panel 4: Add / Edit Product Form */}
      {activeTab === 'form' && (
        <div className="sidebar-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '36px' }}>
          <h2 style={{ borderBottom: 'none', paddingBottom: 0, fontSize: '1.35rem', marginBottom: '24px' }}>
            {editMode ? t('sellerEditProduct') : t('sellerAddProduct')}
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="prodName">{t('productNameLabel')}</label>
              <input
                type="text"
                id="prodName"
                className="form-control"
                placeholder="e.g. Handmade Woolen Shawl"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prodCategory">Category</label>
              <select
                id="prodCategory"
                className="form-control"
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {tDynamic(cat.name)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prodDesc">{t('productDescLabel')}</label>
              <textarea
                id="prodDesc"
                className="form-control"
                rows="4"
                placeholder="List material, sizes, care instructions..."
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="prodPrice">{t('productPriceLabel')}</label>
                <input
                  type="number"
                  id="prodPrice"
                  className="form-control"
                  placeholder="e.g. 500"
                  min="0"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prodStock">{t('productStockLabel')}</label>
                <input
                  type="number"
                  id="prodStock"
                  className="form-control"
                  placeholder="e.g. 5"
                  min="0"
                  value={prodStock}
                  onChange={(e) => setProdStock(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label className="form-label" htmlFor="prodImage">{t('productImageLabel')}</label>
              <input
                type="url"
                id="prodImage"
                className="form-control"
                placeholder="e.g. https://images.unsplash.com/..."
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '6px' }}>
                Paste a direct web link to your photo. Leave blank for a default placeholder.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setActiveTab('products')}
                style={{ flex: 1 }}
              >
                {t('cancel')}
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                disabled={submittingForm}
              >
                {submittingForm ? t('loading') : t('save')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
