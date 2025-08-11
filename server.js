import express from 'express';
import bodyParser from 'body-parser';
import pool from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM properties');
  res.render('index', { properties: result.rows });
});

app.get('/add', (req, res) => {
  res.render('add');
});


app.post('/add', async (req, res) => {
  const { title, location, price, image_url } = req.body;
  await pool.query(
    'INSERT INTO properties (title, location, price, image_url) VALUES ($1, $2, $3, $4)',
    [title, location, price, image_url]
  );
  res.redirect('/');
});


app.get('/property/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
  res.render('property', { property: result.rows[0] });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
