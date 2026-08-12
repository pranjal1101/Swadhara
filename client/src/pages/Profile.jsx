import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
  const { user, upgradeToSeller } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [upgrading, setUpgrading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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

        // Redirect to seller dashboard after 2 seconds
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
        {/* User Avatar & Identity info */}
        <div className="profile-details-identity" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          <div className="profile-avatar-circle" style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--surface)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '600', color: 'var(--primary)', overflow: 'hidden' }}>
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h2 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0, fontSize: '1.5rem' }}>{user.name}</h2>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{user.email}</span>
          </div>
        </div>

        {/* Location & Bio */}
        <div className="profile-biometrics" style={{ marginBottom: '32px' }}>
          <div className="biometrics-row" style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase' }}>
              Location
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: '500' }}>
              {user.location || 'Not provided'}
            </span>
          </div>
          <div className="biometrics-row">
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase' }}>
              Bio
            </span>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
              {user.bio || 'Learner on Swadhara'}
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
      </div>
    </div>
  );
}
