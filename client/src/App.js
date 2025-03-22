import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  // Add task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const timestamp = new Date().toISOString();
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, created_at: timestamp })
    });

    const data = await response.json();
    setTasks([...tasks, { ...data, created_at: timestamp }]);
    setNewTask('');
  };

  // Toggle task completion
  const toggleComplete = async (task) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });

    const updatedTask = await response.json();
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const visibleTasks = showPendingOnly
    ? tasks.filter(task => !task.completed)
    : tasks;

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="App">
      <h1>📝 Task Manager Web App</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter your task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <label>
        <input
          type="checkbox"
          checked={showPendingOnly}
          onChange={(e) => setShowPendingOnly(e.target.checked)}
        />
        Show only pending tasks
      </label>

      <p>✅ Completed: {completedCount} | 🕓 Pending: {pendingCount}</p>

      <ul className="task-list">
        {visibleTasks.map(task => (
          <li key={task.id} className={task.completed ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <span>{task.title}</span>
            <small style={{ marginLeft: '10px', fontSize: '12px', color: '#777' }}>
              {new Date(task.created_at || Date.now()).toLocaleString()}
            </small>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
