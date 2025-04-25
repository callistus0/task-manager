require('dotenv').config();
const { Pool } = require('pg');

// ✅ Log DB connection config (mask sensitive info in production)
console.log('🔧 Connecting to PostgreSQL with the following config:');
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '✅ set' : '❌ missing');

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false // Azure requires this for SSL
  }
});

// ✅ Optional: check connection immediately
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connection successful');
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection FAILED:', err.message);
    process.exit(1); // Exit app if DB is critical
  });

module.exports = pool;
