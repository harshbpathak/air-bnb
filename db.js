import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',       // change to your DB user
  host: 'localhost',
  database: 'airbnb',
  password: 'harsh',   // change to your password
  port: 5432
});

export default pool;
