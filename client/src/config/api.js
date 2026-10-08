import axios from 'axios';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

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
