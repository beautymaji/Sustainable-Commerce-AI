import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">Sustainable AI</span>
        </div>
        
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">📊</span> Dashboard
          </NavLink>
          <NavLink to="/categorization" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">🏷️</span> Auto-Category
          </NavLink>
          <NavLink to="/support-bot" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">💬</span> Support Bot
          </NavLink>
          
          {/* NEW: Link to AI Logs Page */}
          <NavLink to="/logs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">📜</span> AI Logs
          </NavLink>
        </nav>

        {/* Logout Button at the bottom */}
        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-bar">
          <h3>Sustainable Commerce AI</h3>
          <div className="user-info">
            <span>{user?.name || 'User'}</span>
            <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          </div>
        </header>
        
        <div className="content-wrapper">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default Layout;