const { Pool } = require('pg')
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
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

app.listen(port, () => {
  pool
    .connect()
    .then(res => console.log("Database connected"))
    .catch(err => console.log(err))
  console.log(`Server is running on port ${port}`);
})