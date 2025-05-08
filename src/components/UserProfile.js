import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCreditCard, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [firstName, setFirstName] = useState(userData.firstName || '');
  const [lastName, setLastName] = useState(userData.lastName || '');
  const [email, setEmail] = useState(userData.email || '');

  const handleSave = () => {
    const updatedUser = {
      ...userData,
      firstName,
      lastName,
      email,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '120px auto 40px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #dee2e6'
      }}>
        <img 
          src={`${userData.avatar}/100`}
          alt="User Avatar"
          style={{ 
            borderRadius: '50%',
            width: '100px',
            height: '100px'
          }}
        />
        <div>
          <h1 style={{ margin: '0 0 10px 0', color: '#0d3b66' }}>{userData.username}</h1>
          <p style={{ margin: '0', color: '#666' }}>Member since 2024</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#0d3b66' }}>User Settings</h2>
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            style={{ margin: '10px 0', padding: '8px', width: '100%' }} 
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            style={{ margin: '10px 0', padding: '8px', width: '100%' }} 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ margin: '10px 0', padding: '8px', width: '100%' }} 
          />
        </div>
        <button onClick={handleSave} style={{
          padding: '8px 16px',
          backgroundColor: '#0d3b66',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Subscription Info */}
        <div style={{ 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h2 style={{ 
            margin: '0 0 15px 0', 
            color: '#0d3b66',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FontAwesomeIcon icon={faUsers} />
            Subscription
          </h2>
          <div style={{ marginBottom: '10px' }}>
            <strong>Current Plan:</strong> Gold Subscription
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Features:</strong>
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              <li>1-5 movie lists</li>
              <li>HD streaming</li>
              <li>2 devices</li>
            </ul>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#0d3b66',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Upgrade Plan
          </button>
        </div>

        {/* Payment Info */}
        <div style={{ 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h2 style={{ 
            margin: '0 0 15px 0', 
            color: '#0d3b66',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FontAwesomeIcon icon={faCreditCard} />
            Payment Information
          </h2>
          <div style={{ marginBottom: '10px' }}>
            <strong>Payment Method:</strong> Visa ending in 4242
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Next Billing Date:</strong> March 1, 2024
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#0d3b66',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Update Payment
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ 
          margin: '0 0 15px 0', 
          color: '#0d3b66',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FontAwesomeIcon icon={faUser} />
          Account Settings
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#0d3b66',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Edit Profile
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 