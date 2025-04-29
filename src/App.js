import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StreamListPage from './components/StreamListPage';
import MovieSearchPage from './components/MovieSearchPage';
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import './styles.css'; // Import the CSS file for styling

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<StreamListPage />} />
          <Route path="/movies" element={<MovieSearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
