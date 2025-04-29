import React, { useState, useEffect } from 'react';

const MovieSearchPage = () => {
  const [query, setQuery] = useState(() => {
    // Load the last search term from localStorage on initial render
    return localStorage.getItem('lastSearchTerm') || '';
  });
  const [searchResults, setSearchResults] = useState(() => {
    // Load search results from localStorage on initial render
    const savedResults = localStorage.getItem('searchResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const searchMovies = async () => {
    if (query.length < 3) return; // Only search when the query is at least 3 characters long

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchResults(data.results);
      // Save the search results to localStorage
      localStorage.setItem('searchResults', JSON.stringify(data.results));
      // Save the last search term to localStorage
      localStorage.setItem('lastSearchTerm', query);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    localStorage.removeItem('searchResults'); // Clear from localStorage
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      paddingTop: '60px',
      backgroundColor: '#f0f4f8', // Light gray-blue for a softer background
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px', // Space below the input
    },
    input: {
      padding: '10px',
      border: '1px solid #0d3b66', // Dark Blue
      borderRadius: '5px',
      width: '200px', // Adjust width as needed
      marginRight: '10px', // Space between input and button
    },
    button: {
      backgroundColor: '#0d3b66', // Dark Blue
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px', // Add padding for button
      cursor: 'pointer',
    },
    resultsList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      listStyleType: 'none', // Remove default list styling
      padding: 0,
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '5px',
      margin: '10px',
      width: '150px', // Card width
      textAlign: 'center',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    poster: {
      width: '100%',
      height: 'auto',
    },
    title: {
      padding: '10px 0',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter movie title"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Search</button>
        </div>
      </form>
      <button onClick={clearSearchResults} style={styles.button}>Clear Results</button>
      <ul style={styles.resultsList}>
        {searchResults.map((movie) => (
          <li key={movie.id} style={styles.card}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={styles.poster}
              />
            ) : (
              <div style={{ height: '225px', backgroundColor: '#ddd' }}>No Image</div>
            )}
            <div style={styles.title}>{movie.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearchPage;
