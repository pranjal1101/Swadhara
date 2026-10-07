import axios from 'axios';

/**
 * Centralized API Base URL Configuration for Swadhara
 * Production URL: https://swadhara.onrender.com (via VITE_API_URL env var on Vercel)
 * Local Development: Defaults to empty string (proxied by Vite to http://localhost:5000)
 */
const API_URL = import.meta.env.VITE_API_URL || '';

if (API_URL) {
  axios.defaults.baseURL = API_URL.replace(/\/$/, '');
}

export default API_URL;
