import Database from "./database";
import { config } from "./constants";

const { Pool } = require('pg')
const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({"test": true})
});

app.post('/addToMailingList', async (req, res) => {
  try {
    const email = await Database.addToMailingList(req.body);
    res.json(email);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post('/mailingListConfirmationMail', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.MAIL, 
        pass: process.env.MAIL_PASS
      }
    });

    // send mail with defined transport object
    const mailOptions = {
      from: 'hello@adaptivemaths.co.uk', // sender address
      to: req.body.email, // list of receivers
      subject: "Thanks for showing interest in Adaptive Learning!", // Subject line
      text: "Hello world?", // plain text body
      html: `
          <p>
            Hi,<br/>
            <br/>
            We have added you to our mailing list and we will update you when we are ready to launch.<br/>
            See you then!
          </p>
        `
         // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
});

app.post('/signup/addUser', async (req, res) => {
  try {
    const user = await Database.addUser(req.body);
    res.json(user);
  } catch (error) {
    res.body = "Error: " + error;
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});