import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  // Edit fields
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
        
        // Notify Navbar of user role update
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
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '600px' }}>
      <h1 className="profile-page-title" style={{ marginBottom: '32px' }}>
        {t('navProfile')}
      </h1>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div className="sidebar-card" style={{ padding: '36px' }}>
        {!editMode ? (
          <>
            {/* View Mode */}
            <div className="profile-details-identity" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
              <div className="profile-avatar-circle" style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--surface)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '600', color: 'var(--primary)', overflow: 'hidden', flexShrink: 0 }}>
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div style={{ flexGrow: 1 }}>
                <h2 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0, fontSize: '1.5rem' }}>{user.name}</h2>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', display: 'block' }}>{user.email}</span>
              </div>
              <button 
                onClick={() => setEditMode(true)} 
                className="btn btn-secondary btn-sm"
                style={{ minHeight: '38px' }}
              >
                Edit Info
              </button>
            </div>

            {/* Location & Bio */}
            <div className="profile-biometrics" style={{ marginBottom: '32px' }}>
              <div className="biometrics-row" style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase' }}>
                  Location
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: '500' }}>
                  {user.location || 'Not specified'}
                </span>
              </div>
              <div className="biometrics-row">
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase' }}>
                  Bio
                </span>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  {user.bio || 'Swadhara platform user.'}
                </p>
              </div>
            </div>

            {/* Upgrade / Account Type Controls */}
            <div className="profile-role-status-action">
              {user.role === 'seller' ? (
                <div className="alert alert-success" style={{ marginBottom: 0, padding: '16px' }}>
                  <span style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Maker Account Active</span>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>
                    You can add and sell creations. Navigate to the{' '}
                    <Link to="/seller" style={{ textDecoration: 'underline', fontWeight: '600' }}>
                      Maker Panel
                    </Link>{' '}
                    to manage listings.
                  </p>
                </div>
              ) : (
                <div className="become-maker-card" style={{ border: '1px dashed var(--primary)', padding: '24px', borderRadius: '4px', backgroundColor: 'rgba(96, 71, 52, 0.02)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('sellerUpgradeText')}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                    Join our marketplace, showcase what you make, and earn an income from your crafting skills.
                  </p>
                  <button 
                    onClick={handleUpgrade} 
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                    disabled={upgrading}
                  >
                    {upgrading ? t('loading') : t('sellerUpgradeCTA')}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSaveProfile}>
            <h2 style={{ borderBottom: 'none', paddingBottom: 0, fontSize: '1.35rem', marginBottom: '24px' }}>
              Edit Profile Info
            </h2>

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
              <label className="form-label" htmlFor="editBio">Bio</label>
              <textarea
                id="editBio"
                className="form-control"
                rows="3"
                placeholder="Tell us about yourself..."
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
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleCancelEdit}
                style={{ flex: 1 }}
              >
                {t('cancel')}
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                disabled={saving}
              >
                {saving ? t('loading') : t('save')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
