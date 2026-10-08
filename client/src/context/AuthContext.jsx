import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('swadhara_token');

      if (storedToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setToken(storedToken);

          const response = await axios.get('/api/auth/me');
          if (response.data && response.data.success) {
            setUser(response.data.data);
          } else {
            clearAuth();
          }
        } catch (error) {
          console.error('Auto login verification failed:', error.message);
          clearAuth();
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('swadhara_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });

      if (response.data && response.data.success) {
        const { token: userToken, ...userData } = response.data.data;

        localStorage.setItem('swadhara_token', userToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

        setToken(userToken);
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });

      if (response.data && response.data.success) {
        const { token: userToken, ...userData } = response.data.data;

        localStorage.setItem('swadhara_token', userToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

        setToken(userToken);
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  };

  const logout = () => {
    clearAuth();
  };

  const upgradeToSeller = async () => {
    try {
      const response = await axios.post('/api/auth/upgrade');

      if (response.data && response.data.success) {
        setUser(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile upgrade failed';
      throw new Error(message);
    }
  };

  const updateProfileDetails = async (profileData) => {
    try {
      const response = await axios.put('/api/auth/profile', profileData);

      if (response.data && response.data.success) {
        setUser(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, upgradeToSeller, updateProfileDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
