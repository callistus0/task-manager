// src/Login.js
import React, { useState } from 'react';

function Login({ onLogin, toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    try {
      const res = await fetch(
        'https://taskmanager-backend-callistus-fpaxf6h3gbf5exeh.northeurope-01.azurewebsites.net/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        onLogin({ id: data.userId, email });
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setError('Login error. Please try again later.');
    }
  };

  return (
    <>
      <h2 className="login-title">Welcome</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        className="login-input"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="login-footer">
        Don’t have an account?{' '}
        <button className="login-link-button" onClick={toggleForm}>
          Register
        </button>
      </p>
    </>
  );
}

export default Login;
