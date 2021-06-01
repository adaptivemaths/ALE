const { Pool } = require('pg')
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({"test": true})
})

app.get('/dbCon', (req, res) => {
  pool
    .connect()
    .then(() => res.json({"result": "Database connected"}))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})