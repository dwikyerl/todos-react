import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed, onDelete, onToggle}) => {
  return (
    <li className="task">
      <span
      style={{
        textDecoration: completed ? 'line-through' : 'none',
        color: completed ? '#bdc3c7' : '#000'
      }}
      onClick={onToggle}
      >
    
      {name}</span>
      <span className="delete-btn" onClick={onDelete}> X </span>
    </li>
  );
};

export default TodoItem;