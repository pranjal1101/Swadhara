import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Package, ShoppingBag, Edit3, Trash2, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

export default function SellerDashboard() {
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    if (!window.confirm('Are you sure you want to delete this creation?')) return;
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.data.success) {
        setSuccessMsg(response.data.message);
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
        await fetchSellerData();
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

      <div style={{
        backgroundColor: 'var(--bg-pink-soft)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '36px',
        marginBottom: '36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-subtle)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div>
          <span className="eyebrow-pill">CREATIVE WORKSPACE</span>
          <h1 style={{ fontSize: '2.4rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>
            My Workspace
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Manage your creations, track customer orders, and add new handmade products.
          </p>
        </div>

        <button onClick={handleOpenCreateForm} className="btn btn-rose">
          <Plus size={18} /> New Creation
        </button>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '36px' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'overview' ? '700' : '500',
            color: activeTab === 'overview' ? 'var(--primary-rose-dark)' : 'var(--text-muted)',
            borderBottom: activeTab === 'overview' ? '3px solid var(--primary-rose-dark)' : '3px solid transparent'
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'products' ? '700' : '500',
            color: activeTab === 'products' ? 'var(--primary-rose-dark)' : 'var(--text-muted)',
            borderBottom: activeTab === 'products' ? '3px solid var(--primary-rose-dark)' : '3px solid transparent'
          }}
        >
          My Creations ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'orders' ? '700' : '500',
            color: activeTab === 'orders' ? 'var(--primary-rose-dark)' : 'var(--text-muted)',
            borderBottom: activeTab === 'orders' ? '3px solid var(--primary-rose-dark)' : '3px solid transparent'
          }}
        >
          Incoming Orders ({orders.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card-editorial" style={{ padding: '36px', textAlign: 'center' }}>
            <Package size={36} style={{ color: 'var(--primary-rose-dark)', marginBottom: '12px' }} />
            <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary-dark)', display: 'block', marginBottom: '4px' }}>
              {products.length}
            </span>
            <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Creations Listed</span>
          </div>

          <div className="card-editorial" style={{ padding: '36px', textAlign: 'center' }}>
            <ShoppingBag size={36} style={{ color: 'var(--primary-rose-dark)', marginBottom: '12px' }} />
            <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary-dark)', display: 'block', marginBottom: '4px' }}>
              {orders.length}
            </span>
            <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Incoming Orders</span>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          {products.length === 0 ? (
            <div className="empty-state-box">
              <p style={{ margin: '0 0 16px 0' }}>No creations listed yet.</p>
              <button onClick={handleOpenCreateForm} className="btn btn-rose btn-sm">
                Add Your First Creation
              </button>
            </div>
          ) : (
            <div className="grid grid-3">
              {products.map((product) => (
                <div key={product._id} className="card-editorial" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <SafeImage src={product.images?.[0]} alt={product.name} category={product.category?.slug} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span className="badge-tag" style={{ width: 'fit-content', marginBottom: '8px' }}>
                      {tDynamic(product.category?.name)}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '6px', color: 'var(--primary-dark)' }}>{product.name}</h3>
                    <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '16px' }}>
                      ₹{product.price} &bull; {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: 'auto', display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenEditForm(product)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-outline btn-sm" style={{ borderColor: 'var(--error-text)', color: 'var(--error-text)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          {orders.length === 0 ? (
            <div className="empty-state-box" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <ShoppingBag size={48} style={{ color: 'var(--primary-rose-dark)', marginBottom: '16px' }} />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', color: 'var(--primary-dark)' }}>No Incoming Orders Yet</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Your incoming customer sales orders will appear here automatically when buyers place orders.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {orders.map((order) => {
                const orderNum = order.orderNumber || `SWD-${order._id.substring(order._id.length - 6).toUpperCase()}`;
                const buyerName = order.user?.name || 'Buyer';
                const firstItem = order.items && order.items[0];
                const product = firstItem?.product;

                return (
                  <div key={order._id} className="card-editorial" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                      <div>
                        <span style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '1.05rem', display: 'block' }}>
                          Order #{orderNum}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                          Buyer: <strong>{buyerName}</strong> &bull; Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          backgroundColor: '#E6F4EA',
                          color: '#137333',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          border: '1px solid #CEEAD6'
                        }}>
                          PAID
                        </span>

                        <span style={{
                          backgroundColor: order.status === 'DELIVERED' ? '#E6F4EA' : order.status === 'CONFIRMED' ? '#E8F0FE' : '#FEF7E0',
                          color: order.status === 'DELIVERED' ? '#137333' : order.status === 'CONFIRMED' ? '#1A73E8' : '#B06000',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', marginBottom: '8px' }}>
                          <span>{item.product?.name || 'Creation'} &times; {item.quantity}</span>
                          <span style={{ fontWeight: '600' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', backgroundColor: '#FAF8F9', padding: '12px', borderRadius: '4px' }}>
                      <strong>Shipping Address:</strong> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} ({order.shippingAddress?.zipCode}) &bull; Phone: {order.shippingAddress?.phone}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>
                        Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>

                      <div>
                        {order.status === 'PENDING' && (
                          <button
                            onClick={() => handleOrderStatusUpdate(order._id, 'CONFIRMED')}
                            className="btn btn-rose btn-sm"
                            style={{ fontWeight: '700' }}
                          >
                            Confirm Order
                          </button>
                        )}

                        {order.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleOrderStatusUpdate(order._id, 'DELIVERED')}
                            className="btn btn-secondary btn-sm"
                            style={{ fontWeight: '700', backgroundColor: '#137333', color: '#FFFFFF', borderColor: '#137333' }}
                          >
                            Mark as Delivered
                          </button>
                        )}

                        {order.status === 'DELIVERED' && (
                          <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#137333', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={16} /> Order Delivered
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'form' && (
        <div className="card-editorial" style={{ maxWidth: '640px', margin: '0 auto', padding: '36px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
            {editMode ? 'Edit Creation' : 'Add New Creation'}
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="prodName">What did you make?</label>
              <input
                type="text"
                id="prodName"
                className="form-control"
                placeholder="e.g. Embroidered Tote Bag"
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
              <label className="form-label" htmlFor="prodDesc">Description & Craft Details</label>
              <textarea
                id="prodDesc"
                className="form-control"
                rows="4"
                placeholder="Describe materials, techniques, size, and care instructions..."
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="prodPrice">Price (₹)</label>
                <input
                  type="number"
                  id="prodPrice"
                  className="form-control"
                  placeholder="e.g. 1200"
                  min="0"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prodStock">Stock Available</label>
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
              <label className="form-label" htmlFor="prodImage">Product Image URL</label>
              <input
                type="url"
                id="prodImage"
                className="form-control"
                placeholder="https://images.unsplash.com/..."
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('products')} style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-rose" style={{ flex: 1 }} disabled={submittingForm}>
                {submittingForm ? 'Saving...' : 'Save Creation'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
