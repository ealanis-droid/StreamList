import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

// Define a type for the draggable items
const ItemType = {
  ITEM: 'item',
};

// Define the style constant
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const Card = ({ item, index, moveItem, handleEdit, handleDelete, handleComplete }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.ITEM,
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
        color: item.completed ? 'green' : 'black',
        fontWeight: item.completed ? 'bold' : 'normal',
      }}
    >
      {item.text}
      <FontAwesomeIcon 
        icon={faEdit} 
        onClick={() => handleEdit(index)} 
        style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }} 
      />
      <FontAwesomeIcon 
        icon={faX} 
        onClick={() => handleDelete(index)} 
        style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} 
      />
      <FontAwesomeIcon 
        icon={faEye} 
        onClick={() => handleComplete(index)} 
        style={{ color: item.completed ? 'green' : 'gray', marginLeft: '10px', cursor: 'pointer' }} 
      />
    </li>
  );
};

export default Card; 