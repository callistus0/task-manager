// client/src/Login.js
import React, { useState } from 'react';
import './App.css'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('https://taskmanager-backend-callistus-fpaxf6h3gbf5exeh.northeurope-01.azurewebsites.net/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        onLogin({ id: data.userId, email });
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        <div className="login-footer">
          Don’t have an account?
        </div>
      </div>
    </div>
  );
}

export default Login;
