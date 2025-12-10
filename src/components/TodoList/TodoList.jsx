import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, onDelete, onToggle, onEdit }) {
  return (
    <div className={styles.list}>
      {todos.length > 0 ? (
        <ul className={styles.list_items}>
          {todos.map(todo => (
            <TodoItem 
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.list_blank}>
          <p>Нет задач по выбранному фильтру</p>
        </div>
      )}
    </div>
  );
}

export default TodoList;