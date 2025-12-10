import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import FilterButtons from './components/FilterButtons/FilterButtons';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState('all');


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
    }
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };


  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };


  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

 
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>TO-DO</h1>
          <p className={styles.subtitle}>
            Задачи: {activeCount} активных, {completedCount} выполненных
          </p>
        </header>
        
        <main className={styles.main}>
          <TodoForm onAdd={addTodo} />
          
          <div className={styles.filters}>
            <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
          </div>
          
          <TodoList 
            todos={filteredTodos} 
            onDelete={deleteTodo} 
            onToggle={toggleTodo}
            onEdit={editTodo}
          />
          
          {todos.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyText}>Список задач пуст</p>
              <p className={styles.emptyHint}>Добавьте первую задачу выше</p>
            </div>
          )}
        </main>
        
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Всего задач: {todos.length} | 
            Выполнено: {completedCount} | 
            Осталось: {activeCount}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;