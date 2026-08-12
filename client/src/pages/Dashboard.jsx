import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enrolledRes, ordersRes] = await Promise.all([
          axios.get('/api/courses/user/enrolled'),
          axios.get('/api/orders')
        ]);

        if (enrolledRes.data.success) {
          setEnrolledCourses(enrolledRes.data.data);
        }
        if (ordersRes.data.success) {
          // Get the top 2 recent orders
          setRecentOrders(ordersRes.data.data.slice(0, 2));
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '140px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '300px', width: '100%' }}></div>
      </div>
    );
  }

  return (
    <div className="container section">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Hello, {user?.name}</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-light)' }}>
            Welcome to your learning dashboard
          </p>
        </div>
        <div className="dashboard-role-badge">
          <span className="badge" style={{ backgroundColor: 'var(--surface)', fontSize: '0.8rem', padding: '6px 12px' }}>
            Learner Account
          </span>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="dashboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Ongoing Courses Column */}
        <div className="dashboard-courses-col">
          <h2 style={{ fontSize: '1.4rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '24px' }}>
            Your Ongoing Courses
          </h2>

          {enrolledCourses.length === 0 ? (
            <div className="empty-state-box" style={{ padding: '48px 24px' }}>
              <p style={{ marginBottom: '16px' }}>{t('emptyCourses')}</p>
              <Link to="/courses" className="btn btn-primary">
                {t('ctaStartLearning')}
              </Link>
            </div>
          ) : (
            <div className="dashboard-enrolled-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {enrolledCourses.map((progressObj) => {
                const course = progressObj.course;
                if (!course) return null;
                return (
                  <div key={progressObj._id} className="enrolled-course-row-card">
                    <img src={course.thumbnail} alt={tDynamic(course.title)} className="enrolled-row-img" />
                    <div className="enrolled-row-details">
                      <span className="badge" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>
                        {tDynamic(course.category?.name)}
                      </span>
                      <h3 className="enrolled-row-title">{tDynamic(course.title)}</h3>
                      <span className="enrolled-row-instructor" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        {t('courseInstructor')}: {course.instructor}
                      </span>
                      
                      {/* Progress bar info */}
                      <div className="enrolled-row-progress-block" style={{ marginTop: '12px' }}>
                        <div className="progress-label-flex" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
                          <span>Course Completion</span>
                          <span>{progressObj.percentage}%</span>
                        </div>
                        <div className="progress-track-bar" style={{ height: '6px' }}>
                          <div className="progress-fill" style={{ width: `${progressObj.percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="enrolled-row-action">
                      <button 
                        onClick={() => navigate(`/courses/${course._id}`)} 
                        className="btn btn-secondary btn-sm"
                      >
                        {t('continueLearning')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Summary (Recent Orders, Quick links) */}
        <div className="dashboard-summary-col">
          {/* Recent Orders Overview */}
          <div className="sidebar-card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Recent Orders</h3>
            
            {recentOrders.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You haven't placed any orders yet.</p>
            ) : (
              <div className="dashboard-orders-preview" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {recentOrders.map((order) => (
                  <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <div>
                      <span style={{ fontWeight: '600', display: 'block' }}>
                        Order #{order._id.substring(order._id.length - 6).toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: '600', display: 'block', color: 'var(--primary)' }}>
                        ₹{order.totalAmount}
                      </span>
                      <span className={`status-badge ${order.status === 'Delivered' ? 'status-delivered' : 'status-pending'}`} style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link to="/orders" className="btn btn-outline btn-sm" style={{ width: '100%', textAlign: 'center' }}>
              View All Orders
            </Link>
          </div>

          {/* Maker Portal Promotion if not seller yet */}
          {user && user.role !== 'seller' && (
            <div className="sidebar-card" style={{ backgroundColor: 'var(--surface)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Sell what you make</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '16px' }}>
                Ready to show and sell your custom creations in the marketplace? Upgrading is quick and free.
              </p>
              <Link to="/profile" className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                Become a Maker
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
