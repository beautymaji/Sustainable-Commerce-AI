import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create Context with a default value (prevents undefined errors)
const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tracks if we are checking local storage

  useEffect(() => {
    // Check if user data exists in local storage on app load
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('userInfo', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  // Signup Function
  const signup = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/signup`, { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;