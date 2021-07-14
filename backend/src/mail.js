const nodemailer = require("nodemailer");

export function sendMail(recepient, subject, html) {
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
      from: process.env.MAIL,
      to: recepient,
      subject: subject,
      html: html
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
}
