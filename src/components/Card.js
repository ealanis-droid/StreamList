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
    <li
      ref={ref}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        color: card.completed ? 'green' : 'black',
        fontWeight: card.completed ? 'bold' : 'normal',
      }}
    >
      {card.text}
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
    </li>
  );
};

export default Card; 