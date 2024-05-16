import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  });

  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input.trim(), completed: false, deadline: deadline || null };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput('');
    setDeadline('');
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'active':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="app">
      <h1>Anugerah's To-Do List</h1>
      <form onSubmit={addTask} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambahkan Tugas Baru"
          className="input-field"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Tanggal Deadline (Opsional)"
          className="date-field"
        />
        <button type="submit" className="add-button">
          Tambahkan Tugas
        </button>
      </form>
      <div className="filter-container">
        <button
          onClick={() => setFilter('all')}
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        >
          Semua Tugas
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
        >
          Tugas Aktif
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        >
          Tugas Selesai
        </button>
      </div>
      <ul className="task-list">
        {getFilteredTasks().map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
              className="checkbox"
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            {task.deadline && (
              <span className="deadline">Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;