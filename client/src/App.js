import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  // Add a task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    });

    const data = await response.json();
    setTasks([...tasks, data]);
    setNewTask('');
  };

  // Toggle completion
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
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks if checkbox is checked
  const visibleTasks = showPendingOnly
    ? tasks.filter(task => !task.completed)
    : tasks;

  return (
    <div className="App">
      <header className="App-header">
        <h1>TaskMaster</h1>
      </header>

      <div className="task-input">
      <h3 className="add-task">ADD TASK</h3>
        <input
          type="text"
          placeholder="Enter your task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Submit</button>
      </div>

      <div className="filter-section">
        <label>
          <input
            type="checkbox"
            checked={showPendingOnly}
            onChange={(e) => setShowPendingOnly(e.target.checked)}
          />
          Show only pending tasks
        </label>
        <button
          className="filter-button"
          onClick={() => setShowPendingOnly(!showPendingOnly)}
        >
          {showPendingOnly ? "Show All" : "Show Pending"}
        </button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Filter</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleTasks.map(task => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <span>{task.title}</span>
              </td>
              <td>{task.completed ? "Completed" : "Pending"}</td>
              <td>
                <select value={task.completed ? "Completed" : "Pending"} onChange={(e) => toggleComplete(task)}>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td>
                <button className="delete-task" onClick={() => deleteTask(task.id)}>Delete Task</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
