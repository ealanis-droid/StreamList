import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faShoppingCart, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <ul className={isOpen ? 'open' : ''}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faHome} /> StreamList
          </Link>
        </li>
        <li>
          <Link to="/movies" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faFilm} /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
        </li>
        <li className="user-profile">
          <Link to="/profile" onClick={() => setIsOpen(false)}>
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