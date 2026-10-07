import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <footer className="editorial-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div>
            <div className="header-brand" style={{ marginBottom: '16px' }} onClick={() => navigate('/')}>
              <span className="footer-brand-title">Swadhara</span>
              <span className="header-brand-dot"></span>
            </div>
            <p className="footer-brand-desc">
              An elegant, human-centered Indian platform empowering women to Learn practical skills, Create handmade treasures, and Earn a sustainable livelihood.
            </p>
          </div>

          {/* Quick Navigation Column */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/courses" className="footer-link">Learn Skills</Link></li>
              <li><Link to="/marketplace" className="footer-link">Handmade Marketplace</Link></li>
              <li><Link to="/dashboard" className="footer-link">My Journey</Link></li>
              <li><Link to="/seller" className="footer-link">Maker Workspace</Link></li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="footer-col-title">Skill Categories</h4>
            <ul className="footer-links-list">
              <li><Link to="/courses?category=tailoring" className="footer-link">Tailoring & Sewing</Link></li>
              <li><Link to="/courses?category=embroidery" className="footer-link">Hand Embroidery</Link></li>
              <li><Link to="/courses?category=baking" className="footer-link">Artisanal Baking</Link></li>
              <li><Link to="/courses?category=jewellery" className="footer-link">Jewellery Making</Link></li>
              <li><Link to="/courses?category=handicrafts" className="footer-link">Handicrafts & Arts</Link></li>
            </ul>
          </div>

          {/* Support & Community Column */}
          <div>
            <h4 className="footer-col-title">Community</h4>
            <ul className="footer-links-list">
              <li><Link to="/profile" className="footer-link">Creator Profiles</Link></li>
              <li><Link to="/login" className="footer-link">Sign In</Link></li>
              <li><Link to="/register" className="footer-link">Join Swadhara</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <span>&copy; {new Date().getFullYear()} Swadhara Platform. All rights reserved.</span>
          <span>Crafted with care for Indian Women Creators & Learners.</span>
        </div>
      </div>
    </footer>
  );
}
