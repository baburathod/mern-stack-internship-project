import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { Plus, Trash2 } from 'lucide-react';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await API.post('/todos', { title: newTodo, priority });
      setTodos([res.data, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    try {
      const res = await API.put(`/todos/${id}`, { completed: !currentStatus });
      setTodos(todos.map(t => t._id === id ? res.data : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="main-content">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Tasks</h2>

      <div className="todo-container">
        <form className="todo-add" onSubmit={addTodo}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <select 
            className="form-select" 
            style={{ width: 'auto' }}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="btn">
            <Plus size={20} />
            Add
          </button>
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tasks yet. Add one above!</p>
          ) : (
            todos.map(todo => (
              <div key={todo._id} className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}>
                <div className="todo-content">
                  <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id, todo.completed)}
                  />
                  <span className="todo-text">{todo.title}</span>
                  <span className={`priority-badge prio-${todo.priority}`}>
                    {todo.priority}
                  </span>
                </div>
                <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
