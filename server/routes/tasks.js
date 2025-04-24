const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ Create a new task with optional due_date and user_id
router.post('/', async (req, res) => {
  try {
    const { title, due_date, userId } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, completed, due_date, user_id) VALUES ($1, false, $2, $3) RETURNING *',
      [title, due_date || null, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// ✅ Get tasks for a specific user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ✅ Edit an existing task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *',
      [title, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error editing task:', err.message);
    res.status(500).json({ error: 'Failed to edit task' });
  }
});

// ✅ Toggle completed status
router.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error toggling task:', err.message);
    res.status(500).json({ error: 'Failed to toggle task status' });
  }
});

module.exports = router;
