import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

// Define a type for the draggable items
const ItemType = {
  CARD: 'card',
};

// Define the style constant
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const Card = ({ card, index, moveCard, handleEdit, handleDelete, handleComplete }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover(draggedCard) {
      if (draggedCard.index !== index) {
        moveCard(draggedCard.index, index);
        draggedCard.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ 
      border: '1px solid #ddd', 
      borderRadius: '5px', 
      padding: '10px', 
      marginBottom: '10px', 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      {card.poster && (
        <img
          src={card.poster}
          alt={card.text}
          style={{ width: '50px', height: '75px', marginRight: '10px' }} // Adjust size as needed
        />
      )}
      <span style={{ flex: 1 }}>{card.text}</span>
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
        icon={faEye} 
        onClick={() => handleComplete(index)} 
        style={{ color: card.completed ? 'green' : 'gray', marginLeft: '10px', cursor: 'pointer' }} 
      />
    </div>
  );
};

export default Card; 