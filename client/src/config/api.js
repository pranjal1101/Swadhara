import axios from 'axios';

/**
 * Centralized API Base URL Configuration for Swadhara
 * Production URL: https://swadhara.onrender.com (via VITE_API_URL or production hostname fallback)
 * Local Development: Defaults to empty string (proxied by Vite to http://localhost:5000)
 */
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Production fallback for deployed frontend domains (e.g. vercel.app)
  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.hostname &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1')
  ) {
    return 'https://swadhara.onrender.com';
  }
  return '';
};

const API_URL = getApiBaseUrl();

if (API_URL) {
  axios.defaults.baseURL = API_URL.replace(/\/$/, '');
}

export default API_URL;
