import Database from "./database";
import { config } from "./constants";
import { sendMail } from "./mail";

const { Pool } = require('pg')
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");


const bcrypt = require("bcrypt");

const app = express();
app.use(cookieParser());
require("dotenv").config();

const port = process.env.PORT || 5000;


app.use(
  cors({
    credentials: true,
    origin: config.ORIGIN,
  })
);
app.use(express.json());


app.get('/test', (req, res) => {
  res.json({"test": true})
});

app.post('/addToMailingList', async (req, res) => {
  try {
    const email = await Database.addToMailingList(req.body);
    sendMail(req.body.email, "Thanks for showing interest in Adaptive Learning!", `
      <p>
        Hi,<br/>
        <br/>
        We have added you to our mailing list and we will update you when we are ready to launch.<br/>
        See you then!
      </p>
    `);
    res.json(email);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post('/signup/addUser', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await Database.addUser(req.body);
    sendMail(req.body.email, "Welcome to Adaptive Learning!", `
      <p>
        Hi ${req.body.firstName},<br/>
        <br/>
        Thanks for joining Adaptive Learning. 
        We hope you will have a great experience learning Maths on our website!
        <br/><br/>
        Best of luck,<br/>
        EdiCat Team
      </p>
    `);
    res.json(user);
  } catch (error) {
    res.body = "Error: " + error;
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const user = await Database.getUser(req.body);
    console.log(user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.cookie("username", user.username, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 86400 * 1000,
      });
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
})

app.post('/user/info', async (req, res) => {
  try {
    console.log("req=", req.body);
    const user = await Database.getUser({
      username: req.body.username,
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get('/assessments/getPaperNames', (req, res) => {
  try {
    const papers = await Database.getPaperNames();
    res.json(papers);
  } catch (error) {
    res.body = "Error: " + error;
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



