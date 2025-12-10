import React, { useState } from 'react';
import styles from './TodoForm.module.css';

function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError('Введите текст задачи');
      return;
    }
    
    if (inputValue.trim().length < 3) {
      setError('Задача должна содержать минимум 3 символа');
      return;
    }
    
    onAdd(inputValue);
    setInputValue('');
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__group}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError('');
          }}
          placeholder="Что нужно сделать?"
          className={`${styles.form__input} ${error ? styles.form__input_error : ''}`}
        />
        
        <button 
          type="submit" 
          className={styles.form__button}
          disabled={!inputValue.trim()}
        >
          Добавить
        </button>
      </div>
      
      {error && (
        <div className={styles.form__error}>
          ⚠️ {error}
        </div>
      )}
    </form>
  );
}

export default TodoForm;