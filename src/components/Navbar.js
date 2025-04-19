import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="pinning-header" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <div className="pinning-header-container">
        <div className="main-header" role="navigation">
          <Link to="/" className="logo" aria-label="StreamList">
            <FontAwesomeIcon icon={faHome} /> StreamList
          </Link>
          <ul className="tabbed-primary-navigation">
            <li className="navigation-tab">
              <Link to="/" className="current active">Home</Link>
            </li>
            <li className="navigation-tab">
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li className="navigation-tab">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="navigation-tab">
              <Link to="/new-popular">New & Popular</Link>
            </li>
            <li className="navigation-tab">
              <Link to="/my-list">My List</Link>
            </li>
            <li className="navigation-tab">
              <Link to="/languages">Browse by Languages</Link>
            </li>
          </ul>
          <div className="secondary-navigation">
            <div className="nav-element">
              <button className="searchTab" aria-label="Search">
                <FontAwesomeIcon icon={faFilm} />
              </button>
            </div>
            <div className="nav-element">
              <button className="notifications-menu" aria-label="Notifications">
                <FontAwesomeIcon icon={faBell} />
              </button>
            </div>
            <div className="nav-element">
              <div className="account-menu-item" onClick={toggleDropdown}>
                <span className="profile-link">
                  <img className="profile-icon" src="https://i.pravatar.cc/40" alt="User Avatar" />
                </span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/logout">Logout</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;