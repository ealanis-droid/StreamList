import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getLastSearchTerm, setLastSearchTerm, getSearchResults, setSearchResults, addToMovieList } from '../utils/storage';

const MovieSearchPage = () => {
  const [query, setQuery] = useState(() => getLastSearchTerm());
  const [searchResults, setSearchResultsState] = useState(() => getSearchResults());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    if (query.length < 3) {
      setError('Please enter at least 3 characters to search');
      return;
    }

    setIsLoading(true);
    setError('');

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
      setSearchResultsState(data.results);
      setSearchResults(data.results);
      setLastSearchTerm(query);
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const clearSearchResults = () => {
    setSearchResultsState([]);
    setSearchResults([]);
    setQuery('');
    setLastSearchTerm('');
  };

  const addToList = (movie) => {
    console.log("Adding movie:", movie);
    if (addToMovieList(movie)) {
      alert(`${movie.title} added to your list!`);
    } else {
      alert(`${movie.title} is already in your list!`);
    }
  };

  // Inline styles
  const styles = {
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      border: '1px solid #0d3b66',
      borderRadius: '5px',
      width: '200px',
      marginRight: '10px',
    },
    button: {
      backgroundColor: '#0d3b66',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    resultsList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      listStyleType: 'none',
      padding: 0,
      gap: '20px',
      marginTop: '20px'
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '5px',
      width: '150px',
      textAlign: 'center',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column'
    },
    poster: {
      width: '100%',
      height: 'auto',
    },
    title: {
      padding: '10px 0',
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#0d3b66',
      color: 'white',
      border: 'none',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      marginTop: 'auto',
      transition: 'background-color 0.2s'
    },
    error: {
      color: '#c00',
      backgroundColor: '#fee',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      textAlign: 'center'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      margin: '20px 0'
    }
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
      <h1 style={{ 
        margin: '0 0 20px 0', 
        color: '#0d3b66',
        textAlign: 'center'
      }}>Search Movies</h1>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSearch}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter movie title"
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      <button 
        onClick={clearSearchResults} 
        style={styles.button}
        disabled={isLoading || searchResults.length === 0}
      >
        Clear Results
      </button>

      {isLoading ? (
        <div style={styles.loading}>
          <FontAwesomeIcon icon={faSpinner} spin />
          Loading results...
        </div>
      ) : (
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
              <button 
                onClick={() => addToList(movie)}
                style={styles.addButton}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0a2d4d'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#0d3b66'}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add to List
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearchPage;
