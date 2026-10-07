import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';
import heroImg from '../assets/hero.png';
import embroideryImg from '../assets/embroidery.png';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: '960px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
        backgroundColor: '#FFFFFF'
      }}>
        {/* LEFT EDITORIAL PANEL (Panel 10 Reference) */}
        <div style={{
          backgroundColor: 'var(--bg-pink-soft)',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="eyebrow-pill">SWADHARA PLATFORM</span>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
              Learn.<br />Create.<br />Earn.
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
              Empowering women through practical skill building, creative craftsmanship, and sustainable income.
            </p>
          </div>

          <div style={{ height: '180px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', border: '2px solid #FFFFFF', marginTop: '24px' }}>
            <SafeImage
              src={heroImg}
              alt="Handmade craft"
              category="hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* RIGHT FORM CONTAINER */}
        <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Welcome back!</h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
            Sign in to access your learning courses and workspace.
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '42px', height: '46px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '42px', height: '46px' }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-rose btn-lg"
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: '700', color: 'var(--primary-rose-dark)', textDecoration: 'underline' }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
