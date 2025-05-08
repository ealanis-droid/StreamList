import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faShoppingCart, faInfoCircle, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { removeUser, removeFromStorage } from '../utils/storage';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Only clear session-specific data
    removeUser();
    removeFromStorage('searchResults');
    removeFromStorage('lastSearchTerm');
    navigate('/login');
  };

  if (!user) return null; // Don't show navbar on login page

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> StreamList
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <FontAwesomeIcon icon={faFilm} /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
        </li>
        <li>
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img 
              src={`${user.avatar}/40`}
              alt="User Avatar"
              className="avatar"
              style={{ borderRadius: '50%' }}
            />
            <span>Welcome, {user.username}</span>
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 