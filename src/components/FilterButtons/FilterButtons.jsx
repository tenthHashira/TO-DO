import React from 'react';
import styles from './FilterButtons.module.css';

const filters = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' }
];

function FilterButtons({ currentFilter, onFilterChange }) {
  return (
    <div className={styles.filters}>
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`${styles.filters__button} ${currentFilter === filter.id ? styles.filters__button_active : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;