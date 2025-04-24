const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); // ✅ Auth route

const app = express();

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://wonderful-forest-08f165403.6.azurestaticapps.net'
}));

app.use(express.json());

// ✅ API routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', authRoutes); // ✅ Updated from /api/auth to /api/users

// ✅ Basic route
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// ✅ Test DB connection route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ Connected to DB. Current time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('❌ DB error:', err.message);
    res.status(500).send(`❌ DB connection error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
