import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

const StreamListPage = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [placeholder, setPlaceholder] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setPlaceholder('Enter movie title');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) => 
        index === editIndex ? { text: input, completed: false } : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, { text: input, completed: false }]);
    }
    setInput('');
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    setInput(items[index].text);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="centered-page">
      <h1>Welcome {'{{USER}}'}</h1>
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
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {item.text}
            <FontAwesomeIcon 
              icon={faEdit} 
              onClick={() => handleEdit(index)} 
              style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }} 
            />
            <FontAwesomeIcon 
              icon={faTrash} 
              onClick={() => handleDelete(index)} 
              style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} 
            />
            <FontAwesomeIcon 
              icon={faCheck} 
              onClick={() => handleComplete(index)} 
              style={{ color: item.completed ? 'green' : 'gray', marginLeft: '10px', cursor: 'pointer' }} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamListPage; 