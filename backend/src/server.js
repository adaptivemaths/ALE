import Database from "./database";
import { config } from "./constants";
import { sendMail } from "./mail";

const express = require("express");
// Cross-Origin Resource Sharing
const cors = require("cors");
const cookieParser = require("cookie-parser");

// For password encryption
const bcrypt = require("bcrypt");
// Server
const app = express();

app.use(cookieParser());
// using variables in .env file
require("dotenv").config();
// Port to listen on
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: config.ORIGIN,
  })
);
// Returning JSON objects
app.use(express.json());

/*
  Add email to database and send automated confirmation email
*/
app.post("/addToMailingList", async (req, res) => {
  try {
    const email = await Database.addToMailingList(req.body);
    sendMail(
      req.body.email,
      "Thanks for showing interest in Adaptive Learning!",
      `
      <p>
        Hi,<br/>
        <br/>
        We have added you to our mailing list and we will update you when we are ready to launch.<br/>
        See you then!
      </p>
    `
    );
    res.json(email);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/signup/addUser", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await Database.addUser(req.body);

    sendMail(
      req.body.email,
      "Welcome to Adaptive Learning!",
      `
      <p>
        Hi ${req.body.firstName},<br/>
        <br/>
        Thanks for joining Adaptive Maths. 
        We hope you will have a great experience practicing Maths on our platform!
        <br/><br/>
        Best of luck,<br/>
        AdaptiveMaths Team
      </p>
    `
    );

    res.json(user);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/users/login", async (req, res) => {
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
});

app.post("/user/info", async (req, res) => {
  try {
    const body = req.body;
    let user = {};

    if (body.username != undefined) {
      console.log("should be here");
      user = await Database.getUserWithEmail({
        username: body.username,
      });
    } else if (body.userId != undefined) {
      user = await Database.getUser({
        userId: body.userId,
      });
    }
    console.log("/user/info", user);
    res.json(user);
    return;
  } catch (error) {
    res.body = "user/info Error: " + error;
  }
  console.log("end");
});

app.post("/user/deleteUser", async (req, res) => {
  try {
    const user = await Database.deleteUser({
      userId: req.body.userId,
    });
    res.json(user);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/users/all", async (req, res) => {
  try {
    const users = await Database.getAllUsers();
    res.json(users);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/assessments/getPaperNames", async (req, res) => {
  try {
    const papers = await Database.getPaperNames();
    res.json(papers);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/assessments/getQuestions", async (req, res) => {
  try {
    const questions = await Database.getQuestions(req.body);
    res.json(questions);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/user/addAnswer", async (req, res) => {
  try {
    console.log("here");
    const answer = await Database.addAnswer(req.body);
    console.log(answer);
    res.json(answer);
  } catch (error) {
    res.body = "Error: " + error;
    console.log("error:", res.body);
  }
});

app.post("/user/getSubmittedTests", async (req, res) => {
  try {
    const papers = await Database.getSubmittedTests(req.body);
    res.json(papers);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/user/getAnswers", async (req, res) => {
  try {
    const answers = await Database.getAnswers(req.body);
    res.json(answers);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/user/deleteAnswers", async (req, res) => {
  try {
    const answers = await Database.deleteAnswers(req.body);
    res.json(answers);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/user/addAnswerToPoints", async (req, res) => {
  try {
    await Database.addAnswerToPoints(req.body);
  } catch (error) {
    res.body = "Error: " + error;
    console.log("error:", res.body);
  }
});

app.post("/user/learningOutcomeRankings", async (req, res) => {
  try {
    if (req.body.byTopic) {
      res.json(await Database.scoresByTopic(req.body));
    } else if (req.body.topic !== undefined) {
      res.json(await Database.loRankingsForTopic(req.body));
    } else {
      res.json(await Database.learningOutcomeRankings(req.body));
    }
  } catch (error) {
    res.body = "Error: " + error;
    console.log("error:", res.body);
  }
});

app.post("/paper/info", async (req, res) => {
  try {
    const paper = await Database.getPaperInfo(req.body);
    res.json(paper);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/skills/info", async (req, res) => {
  try {
    const skill = await Database.getSkillInfo(req.body);
    res.json(skill);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/skills/forTopic", async (req, res) => {
  try {
    const skills = await Database.getSkillsForTopic(req.body);
    res.json(skills);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/lo/info", async (req, res) => {
  try {
    const lo = await Database.getLo(req.body);
    res.json(lo);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/subLo/info", async (req, res) => {
  try {
    const subLo = await Database.getSubLo(req.body);
    res.json(subLo);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.post("/teachers/signup", async (req, res) => {
  try {
    const { body } = req;
    const teacher = await Database.addTeacher(body);
    res.json(teacher);
  } catch (error) {
    res.body = "Error: " + error;
    console.log(res.body);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
