import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from './LoginNavbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Check if the entered username and password match the demo credentials
    if (username === 'demo@email.com' && password === 'password123') {
      // Retrieve existing user data from localStorage if it exists
      const existingUser = JSON.parse(localStorage.getItem('user')) || {};

      // Store user info in localStorage, using existing data if available
      localStorage.setItem('user', JSON.stringify({ 
        ...existingUser, // Spread existing user data
        username,
        firstName: existingUser.firstName || 'Demetrius', // Use existing first name or default
        lastName: existingUser.lastName || 'Oden', // Use existing last name or default
        email: existingUser.email || 'demo@email.com', // Use existing email or default
        avatar: 'https://i.pravatar.cc', // Add avatar URL
        lastLogin: new Date().toISOString()
      }));
      
      navigate('/'); // Redirect to home page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <LoginNavbar />
      <div style={{ 
        maxWidth: '400px', 
        margin: '120px auto 40px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          color: '#0d3b66', 
          textAlign: 'center', 
          marginBottom: '30px' 
        }}>Welcome to EZTechMovie</h1>
        
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c00',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0d3b66',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px', 
          marginTop: '20px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0d3b66' }}>Demo Credentials</h3>
          <p style={{ margin: '0', color: '#666' }}>
            <strong>Username:</strong> demo@email.com<br />
            <strong>Password:</strong> password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 