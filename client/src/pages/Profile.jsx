import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, User as UserIcon, Edit3, ShoppingBag, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
  const { user, upgradeToSeller, updateProfileDetails } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLocation(user.location || '');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || '');
    }
  }, [user]);

  const handleUpgrade = async () => {
    setUpgrading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await upgradeToSeller();
      if (res.success) {
        setSuccessMsg(t('sellerUpgradeSuccess'));
        window.dispatchEvent(new Event('cart-updated'));
        setTimeout(() => {
          navigate('/seller');
        }, 2000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to activate Maker profile.');
    } finally {
      setUpgrading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await updateProfileDetails({ name, location, bio, profileImage });
      if (res.success) {
        setSuccessMsg(res.message || 'Profile updated successfully!');
        setEditMode(false);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setName(user.name || '');
      setLocation(user.location || '');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || '');
    }
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="container section text-center">
        <p>Please log in to view your profile.</p>
        <Link to="/login" className="btn btn-primary" style={{ marginTop: '16px' }}>Sign In</Link>
      </div>
    );
  }

  const userSkills = ['Embroidery', 'Handicrafts', 'Tailoring'];

  return (
    <div className="container section" style={{ maxWidth: '840px' }}>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div style={{
        backgroundColor: 'var(--bg-pink-soft)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '36px',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #FFFFFF',
            boxShadow: 'var(--shadow-card)',
            flexShrink: 0
          }}>
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--primary-dark)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h1 style={{ fontSize: '2.2rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>
              {user.name}
            </h1>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary-rose-dark)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
              {user.role === 'seller' ? 'Embroidery & Craft Creator' : 'Swadhara Learner'}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> {user.location || 'Jaipur, Rajasthan'} &bull; Joined Swadhara 2024
            </span>
          </div>
        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="btn btn-outline btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Edit3 size={16} /> Edit Info
        </button>
      </div>

      {editMode ? (
        <div className="card-editorial" style={{ padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>Edit Profile Information</h2>
          <form onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label className="form-label" htmlFor="editName">Your Name</label>
              <input
                type="text"
                id="editName"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="editLocation">Location</label>
              <input
                type="text"
                id="editLocation"
                className="form-control"
                placeholder="e.g. Jaipur, Rajasthan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="editBio">Bio / Story</label>
              <textarea
                id="editBio"
                className="form-control"
                rows="4"
                placeholder="Tell us about yourself and your handmade craft..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label className="form-label" htmlFor="editAvatar">Profile Photo URL</label>
              <input
                type="url"
                id="editAvatar"
                className="form-control"
                placeholder="https://images.unsplash.com/..."
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit} style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>

            <div className="card-editorial" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>About Me</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
                {user.bio || `I am ${user.name}, a passionate creator starting my journey with Swadhara. I love hand embroidery, crafting, and creating beautiful items with care and traditional techniques.`}
              </p>
            </div>

            <div className="card-editorial" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>My Craft Skills</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {userSkills.map((sk) => (
                  <span key={sk} className="badge-tag" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="card-editorial" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>
                  My Purchases & Orders
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  View your complete order history, track order status, and check delivery details.
                </p>
              </div>
              <button onClick={() => navigate('/orders')} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingBag size={16} /> My Orders
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            {user.role === 'seller' ? (
              <div className="card-pink-surface" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>
                    Maker Account Active
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Your creations are listed on the marketplace. Manage products and orders in your Maker Panel.
                  </p>
                </div>
                <button onClick={() => navigate('/seller')} className="btn btn-rose btn-sm">
                  Maker Panel &rarr;
                </button>
              </div>
            ) : (
              <div className="card-pink-surface">
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', color: 'var(--primary-dark)' }}>
                  Ready to sell what you make?
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Showcase your handcrafted creations to buyers across India and start earning an income from home.
                </p>
                <button onClick={handleUpgrade} className="btn btn-rose" disabled={upgrading}>
                  {upgrading ? 'Activating...' : 'Activate Maker Account'}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
