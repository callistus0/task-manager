const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *',
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(500).json({ error: 'Failed to add task' });
  }
});

module.exports = router;
