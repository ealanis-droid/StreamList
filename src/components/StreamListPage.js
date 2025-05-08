import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import List from './List';

const StreamListPage = () => {
  const [input, setInput] = useState('');
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('movieList');
    return savedCards ? JSON.parse(savedCards) : [
      { id: 0, text: 'The Shawshank Redemption', completed: false },
      { id: 1, text: 'The Godfather', completed: false },
      { id: 2, text: 'The Dark Knight', completed: false },
      { id: 3, text: '12 Angry Men', completed: false },
      { id: 4, text: 'Schindler\'s List', completed: false },
      { id: 5, text: 'The Lord of the Rings: The Return of the King', completed: false },
      { id: 6, text: 'Pulp Fiction', completed: false },
      { id: 7, text: 'The Lord of the Rings: The Fellowship of the Ring', completed: false },
    ];
  });
  const [placeholder, setPlaceholder] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setPlaceholder('Enter movie title');
  }, []);

  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(cards));
  }, [cards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (editIndex !== null) {
      const updatedCards = cards.map((card, index) => 
        index === editIndex ? { ...card, text: input, completed: false } : card
      );
      setCards(updatedCards);
      setEditIndex(null);
    } else {
      setCards([...cards, { id: cards.length, text: input, completed: false }]);
    }
    setInput('');
  };

  const handleDelete = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleEdit = (index) => {
    setInput(cards[index].text);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedCards = cards.map((card, i) => 
      i === index ? { ...card, completed: !card.completed } : card
    );
    setCards(updatedCards);
  };

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
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
      }}>Welcome {JSON.parse(localStorage.getItem('user'))?.username}</h1>
      <form onSubmit={handleSubmit}>
        <div className={`input-wrapper ${shake ? 'shake' : ''}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
          />
          <button type="submit" className="add-button">
            <FontAwesomeIcon icon={faPlus} style={{ color: '#0d3b66' }} />
          </button>
        </div>
      </form>
      <List
        cards={cards}
        moveCard={moveCard}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
      />
    </div>
  );
};

export default StreamListPage; 