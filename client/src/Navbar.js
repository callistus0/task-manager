// src/Navbar.js
import React from 'react';
import './App.css';
import logo from './logo.png'; // Make sure the logo is in src or public folder

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="TaskMaster Logo" />
        <span className="navbar-title">TaskMaster</span>
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
