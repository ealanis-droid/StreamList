import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './Card';

const ulStyle = {
    listStyleType: 'none', // Remove list item dot
    padding: 0, // Remove default padding 
    margin: 0, // Remove default margin
    display: 'flex', // Use flexbox for layout
    flexDirection: 'column', // Align items vertically
    alignItems: 'center', // Center items horizontally
  };

const List = ({ cards, moveCard, handleEdit, handleDelete, handleComplete }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Watchlist</h2>
      <ul style={ulStyle}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            moveCard={moveCard}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

export default List;
