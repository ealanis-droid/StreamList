import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

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
        <li className="user-profile">
          <Link to="/profile">
            <img 
              src="https://i.pravatar.cc/40" // Placeholder for avatar
              alt="User Avatar"
              className="avatar"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 