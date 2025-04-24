import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const BASE_URL = 'https://taskmanager-backend-callistus-fpaxf6h3gbf5exeh.northeurope-01.azurewebsites.net/api/auth/register';

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    setError('');

    if (!isValidEmail(email)) {
      return setError('Please enter a valid email address');
    }

    if (!password.trim()) {
      return setError('Password is required');
    }

    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onRegister(data); // Login user automatically
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err.message);
      setError('Registration error. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
