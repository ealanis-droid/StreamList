// Utility functions for safe localStorage operations

export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error.message}`);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${error.message}`);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error.message}`);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error.message}`);
    return false;
  }
};

// User-specific storage operations
export const getUser = () => getFromStorage('user');
export const setUser = (user) => setToStorage('user', user);
export const removeUser = () => removeFromStorage('user');

// Movie list operations
const getUserMovieListKey = (username) => `movieList_${username}`;

export const getMovieList = () => {
  const user = getUser();
  if (!user) return [];
  return getFromStorage(getUserMovieListKey(user.username), []);
};

export const setMovieList = (list) => {
  const user = getUser();
  if (!user) return false;
  return setToStorage(getUserMovieListKey(user.username), list);
};

export const addToMovieList = (movie) => {
  const user = getUser();
  if (!user) return false;
  
  const currentList = getMovieList();
  if (!currentList.some(item => item.text === movie.title)) {
    return setMovieList([...currentList, {
      id: movie.id,
      text: movie.title,
      completed: false,
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
    }]);
  }
  return false;
};

// Search results operations
export const getSearchResults = () => getFromStorage('searchResults', []);
export const setSearchResults = (results) => setToStorage('searchResults', results);
export const getLastSearchTerm = () => getFromStorage('lastSearchTerm', '');
export const setLastSearchTerm = (term) => setToStorage('lastSearchTerm', term); 