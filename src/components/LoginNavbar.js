import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const LoginNavbar = () => {
  return (
    <nav style={{ backgroundColor: '#0d3b66' }}>
      <ul style={{ 
        listStyle: 'none', 
        margin: 0, 
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <li style={{ margin: 0 }}>
          <span style={{ 
            color: 'white', 
            fontSize: '1.2em',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FontAwesomeIcon icon={faFilm} />
            EZTechMovie
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default LoginNavbar; 