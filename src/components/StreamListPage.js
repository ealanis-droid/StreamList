import React, { useState } from 'react';

const StreamListPage = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User Input:', input);
    setInput(''); // Clear the input field after submission
  };

  return (
    <div class="centered-page">
      <h1>Welcome {'{{USER}}'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter item"
        />
        <button type="submit">Add to List</button>
      </form>
    </div>
  );
};

export default StreamListPage; 