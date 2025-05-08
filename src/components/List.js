import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './Card';

const ulStyle = {
    listStyleType: 'none', // Remove list item dot
    padding: 8, // Remove default padding 
    margin: 0, // Remove default margin
    display: 'flex', // Use flexbox for layout
    flexDirection: 'column', // Align items vertically
    alignItems: 'center', // Center items horizontally
  };

const List = ({ cards, moveCard, handleEdit, handleDelete, handleComplete }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ul style={ulStyle}>
        {cards.map((card, index) => (
          <li key={card.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Card 
              card={card} 
              handleEdit={() => handleEdit(index)} 
              handleDelete={() => handleDelete(index)} 
              handleComplete={() => handleComplete(index)} 
            />
          </li>
        ))}
      </ul>
    </DndProvider>
  );
};

export default List;
