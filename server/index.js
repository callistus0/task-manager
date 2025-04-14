const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const taskRoutes = require('./routes/tasks');

const app = express();

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://wonderful-forest-08f165403.6.azurestaticapps.net'
}));

app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
