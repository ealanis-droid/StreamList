import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './Card';

const List = ({ items, moveItem, handleEdit, handleDelete, handleComplete }) => {
  const ulStyle = {
    listStyleType: 'none', // Remove list item dot
    padding: 0, // Remove default padding
    margin: 0, // Remove default margin
    display: 'flex', // Use flexbox for layout
    flexDirection: 'column', // Align items vertically
    alignItems: 'center', // Center items horizontally
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Watchlist</h2>
      <ul style={ulStyle}>
        {items.map((item, index) => (
          <Card
            key={index}
            item={item}
            index={index}
            moveItem={moveItem}
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
