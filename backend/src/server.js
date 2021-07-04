import Database from "./database";
import { config } from "./constants";

const { Pool } = require('pg')
const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({"test": true})
})

app.post('/addToMailingList', async (req, res) => {
  try {
    const email = await Database.addToMailingList(req.body);
    res.json(email);
  } catch (error) {
    res.body = "Error: " + error;
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})