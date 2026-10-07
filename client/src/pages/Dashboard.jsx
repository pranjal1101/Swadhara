import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, CheckCircle2, Clock, Layers, ArrowRight, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

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

  const activeCourseProgress = enrolledCourses[0] || null;
  const activeCourse = activeCourseProgress?.course || null;

  // Sample skill journey indicators (Panel 4 Reference)
  const learningSkills = [
    { title: 'Embroidery', progress: 40 },
    { title: 'Tailoring', progress: 25 },
    { title: 'Baking', progress: 10 },
    { title: 'Jewellery', progress: 0 }
  ];

  // User projects showcase (Panel 4 Reference)
  const myProjectsList = [
    { title: 'Embroidery Tote Bag', status: 'In progress - 60%', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop' },
    { title: 'Baking Dreams', status: 'In progress - 70%', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop' },
    { title: 'Tote Bag Design', status: 'Not started', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop' }
  ];

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
      {/* Header Banner (Panel 4 Reference) */}
      <div style={{
        backgroundColor: 'var(--bg-pink-soft)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '36px',
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', margin: '0 0 6px 0', color: 'var(--primary-dark)' }}>
            Good morning, {user?.name || 'Learner'}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            You're doing amazing! Keep going, you're closer to your goals than you think.
          </p>
        </div>

        <button onClick={() => navigate('/courses')} className="btn btn-rose btn-sm">
          Explore Courses <ArrowRight size={16} />
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Main Grid: Continue Learning + Focus & Journey */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', marginBottom: '40px' }}>
        
        {/* LEFT: CONTINUE LEARNING HERO CARD */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Continue Learning</h3>
          
          {activeCourse ? (
            <div className="card-editorial" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '140px', height: '120px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                <SafeImage src={activeCourse.thumbnail} alt={tDynamic(activeCourse.title)} category={activeCourse.category?.slug} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <span className="badge-tag" style={{ marginBottom: '6px' }}>
                  <BookOpen size={12} /> {tDynamic(activeCourse.category?.name)}
                </span>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 6px 0', color: 'var(--primary-dark)' }}>
                  {tDynamic(activeCourse.title)}
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
                  Lesson 3 &bull; {activeCourseProgress.percentage}% complete
                </span>

                {/* Progress bar */}
                <div style={{ height: '6px', backgroundColor: '#F0E2E5', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ width: `${activeCourseProgress.percentage}%`, height: '100%', backgroundColor: 'var(--primary-rose-dark)' }}></div>
                </div>

                <button onClick={() => navigate(`/courses/${activeCourse._id}`)} className="btn btn-rose btn-sm">
                  Start Lesson &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state-box">
              <p style={{ margin: '0 0 16px 0' }}>You haven't started any courses yet.</p>
              <Link to="/courses" className="btn btn-primary btn-sm">Browse Practical Skills</Link>
            </div>
          )}
        </div>

        {/* RIGHT: TODAY'S FOCUS */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Today's Focus</h3>
          <div className="card-pink-surface" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <Clock size={20} style={{ color: 'var(--primary-rose-dark)' }} />
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>Basic Stitches</h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Spend 15 minutes practicing thread tensions and basic outline stitches.
            </p>
            <button onClick={() => navigate('/courses')} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              Start Practice &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* YOUR LEARNING JOURNEY SKILL BREAKDOWN (Panel 4 Reference) */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Learning Journey</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {learningSkills.map((sk) => (
            <div key={sk.title} className="card-editorial" style={{ padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--primary-rose-dark)', display: 'block', marginBottom: '4px' }}>
                {sk.progress}%
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary-dark)', display: 'block' }}>
                {sk.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MY PROJECTS WORKSPACE (Panel 4 Reference) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>My Projects</h3>
          <Link to="/seller" style={{ color: 'var(--primary-rose-dark)', fontWeight: '600', fontSize: '0.9rem' }}>
            View all &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {myProjectsList.map((proj, idx) => (
            <div key={idx} className="card-editorial" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <img src={proj.img} alt={proj.title} style={{ width: '70px', height: '70px', borderRadius: 'var(--border-radius-sm)', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', color: 'var(--primary-dark)' }}>{proj.title}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{proj.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
