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
    const user = await Database.getUserWithEmail(req.body);
    if (user.password === undefined) {
      res.json({ 
        success: false, 
      });
      return;
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json({ 
        success: true, 
      });
    } else {
      res.json({ 
        success: false, 
      });
    }
  } catch (error) {
    console.log(error);
  }
})

app.post('/user/info', async (req, res) => {
  try {
    const body = req.body;
    console.log('body', body);
    let user = {};
    if (body.username != undefined) {
      console.log('should be here')
      user = await Database.getUserWithEmail({
        username: body.username,
      });
    } else if (body.userId != undefined) {
      console.log('should not be here')
      user = await Database.getUser({
        userId: body.userId,
      })
    }
    console.log('/user/info', user);
    res.json(user);
    return;
  } catch (error) {
    res.body = "user/info Error: " + error;
  }
  console.log('end');
});

app.post('/user/deleteUser', async (req, res) => {
  try {
    const user = await Database.deleteUser({
      userId: req.body.userId,
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get('/assessments/getPaperNames', async (req, res) => {
  try {
    const papers = await Database.getPaperNames();
    res.json(papers);
  } catch (error) {
    res.body = "Error: " + error;
  }
})

app.post('/assessments/getQuestions', async (req, res) => {
  try {
    const questions = await Database.getQuestions(req.body);
    res.json(questions);
  } catch (error) {
    res.body = "Error: " + error;
  }
})


app.post('/user/addAnswer', async (req, res) => {
  try {
    const answer = await Database.addAnswer(req.body);
    res.json(answer);
  } catch (error) {
    res.body = "Error: " + error;
  }
})

app.post('/user/getSubmittedTests', async (req, res) => {
  try {
    const papers = await Database.getSubmittedTests(req.body);
    console.log(papers);
    res.json(papers);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
})

app.post('/user/getAnswers', async (req, res) => {
  try {
    const answers = await Database.getAnswers(req.body);
    res.json(answers);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
})

app.post('/user/deleteAnswers', async (req, res) => {
  try {
    const answers = await Database.deleteAnswers(req.body);
    res.json(answers);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
})

app.post('/paper/info', async (req, res) => {
  try {
    const paper = await Database.getPaperInfo(req.body);
    res.json(paper);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



