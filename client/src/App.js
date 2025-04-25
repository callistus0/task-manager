import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const BASE_URL = 'https://taskmanager-backend-callistus-fpaxf6h3gbf5exeh.northeurope-01.azurewebsites.net/api/tasks';

  const addTask = async () => {
    if (!newTask.trim()) {
      alert('Task cannot be empty.');
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask, userId: user.id })
      });
      const data = await response.json();
      if (data && data.id) {
        setTasks([...tasks, data]);
        setNewTask('');
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const response = await fetch(`${BASE_URL}/${task.id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedTask = await response.json();
      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  const deleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await fetch(`${BASE_URL}/${taskToDelete.id}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));
      setShowConfirm(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
  };

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const response = await fetch(`${BASE_URL}?userId=${user.id}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setTasks(data);
          } else {
            console.error('Expected an array but got:', data);
            setTasks([]);
          }
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
          setTasks([]);
        }
      };

      fetchTasks();
    }
  }, [user]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showPendingOnly ? !task.completed : true;
    return matchesSearch && matchesStatus;
  });

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="App-header">TaskMaster</h1>
          {showRegister ? (
            <Register onRegister={setUser} toggleForm={() => setShowRegister(false)} />
          ) : (
            <Login onLogin={setUser} toggleForm={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App main-page">
      <Navbar onLogout={logout} />

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
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={showPendingOnly}
            onChange={(e) => setShowPendingOnly(e.target.checked)}
          />
          Show only pending tasks
        </label>
      </div>

      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete "{taskToDelete?.title}"?</p>
            <button onClick={deleteTask}>Yes, Delete</button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Toggle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <span>{task.title}</span>
              </td>
              <td>{task.completed ? 'Completed' : 'Pending'}</td>
              <td>
                <select
                  value={task.completed ? 'Completed' : 'Pending'}
                  onChange={() => toggleComplete(task)}
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td>
                <button className="delete-task" onClick={() => confirmDelete(task)}>Delete Task</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
