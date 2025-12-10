import React, { useState } from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`${styles.item} ${todo.completed ? styles.item_completed : ''}`}>
      <div className={styles.item__content}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={styles.item__checkbox}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className={styles.item__input}
            autoFocus
          />
        ) : (
          <span 
            className={`${styles.item__text} ${todo.completed ? styles.item__text_completed : ''}`}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
        
        <div className={styles.item__actions}>
          <button
            onClick={handleEdit}
            className={`${styles.item__button} ${styles.item__button_edit}`}
            title={isEditing ? "Сохранить" : "Редактировать"}
          >
            {isEditing ? "💾" : "✏️"}
          </button>
          
          <button
            onClick={() => onDelete(todo.id)}
            className={`${styles.item__button} ${styles.item__button_delete}`}
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className={styles.item__meta}>
        <span className={styles.item__date}>
          {new Date(todo.createdAt).toLocaleDateString('ru-RU')}
        </span>
        <span className={`${styles.item__status} ${todo.completed ? styles.item__status_completed : styles.item__status_active}`}>
          {todo.completed ? 'Выполнено' : 'Активно'}
        </span>
      </div>
    </li>
  );
}

export default TodoItem;