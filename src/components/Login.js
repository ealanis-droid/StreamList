import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from './LoginNavbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in a real app, this would call an API
    if (username && password) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/streamlist');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <LoginNavbar />
      <div style={{ 
        maxWidth: '400px', 
        margin: '120px auto 40px', // Increased top margin from 80px to 120px
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
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0d3b66' }}>Demo Credentials</h3>
          <p style={{ margin: '0', color: '#666' }}>
            <strong>Username:</strong> demo<br />
            <strong>Password:</strong> password123
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ 
                width: '100%', 
                padding: '12px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ 
                width: '100%', 
                padding: '12px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0d3b66',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0a2d4d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0d3b66'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 