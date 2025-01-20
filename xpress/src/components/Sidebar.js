import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <Link to="/" className="sidebar-btn">Home</Link>
        <Link to="/profile" className="sidebar-btn">Profile</Link>
        <Link to="/signup" className="sidebar-btn">Sign Up</Link>
        <Link to="/login" className="sidebar-btn">Login</Link>
        <Link to="/upload" className="sidebar-btn">Upload</Link> {/* Add Upload link */}
        <div className="sidebar-divider"></div>
        <div className="sidebar-profile">
          <img src="profile.jpg" alt="Profile" className="sidebar-profile-img" />
          <Link to="/profile" className="sidebar-profile-name">User Name</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;