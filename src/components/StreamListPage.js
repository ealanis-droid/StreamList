import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './Card';
import List from './List';

// Define a type for the draggable items
const ItemType = {
  ITEM: 'item',
};

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

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
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
      <List
        items={items}
        moveItem={moveItem}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
      />
    </div>
  );
};

export default StreamListPage; 