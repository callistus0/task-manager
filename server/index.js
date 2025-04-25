const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();

// Define CORS options
const corsOptions = {
  origin: 'https://wonderful-forest-08f165403.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ Connected to DB. Current time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('❌ DB error:', err.message);
    res.status(500).send(`❌ DB connection error: ${err.message}`);
  }
});

// Test database connection on startup
(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('❌ Failed to connect to database on startup:', err.message);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});