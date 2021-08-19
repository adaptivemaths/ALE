import { mailingListSQL, usersSQL, questionsSQL, answersSQL, testsSQL, skillsSQL } from "./sql.js";

const pgp = require("pg-promise")({});


require("dotenv").config();

const dbInfo = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const db = pgp(dbInfo);

export default class Database {
  static async addToMailingList(attr) {
    var result = {};

    await db
      .one(mailingListSQL.addMail, attr)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async addUser(attr) {
    var result = {};

    await db
      .one(usersSQL.addUser, attr)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("addUser ERROR:", error); // print error;
      });

    return result;
  }

  static async getUser(attr) {
    var result = {};
    // console.log('getUser data', attr);
    await db
      .one(usersSQL.getUser, attr)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("getUser ERROR:", error); // print error;
      });

    return result;
  }

    static async getUserWithEmail(attr) {
    var result = {};

    await db
      .one(usersSQL.getUserWithEmail, attr)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("getUserWithEmail ERROR:", error); // print error;
      });

    return result;
  }

  static async getPaperNames() {
    var result = {};
    await db
      .any(questionsSQL.getPaperNames)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getPaperInfo(testId) {
    var result = {};
    await db
      .one(testsSQL.getTest, testId)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getQuestions(paper) {
    var result = {};
    await db
      .any(questionsSQL.getQuestions, paper)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async deleteUser(user) {
    var result = {};
    await db
      .any(usersSQL.deleteUser, user)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async addAnswer(attr) {
    var result = {};

    await db
      .one(answersSQL.addAnswer, attr)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getSubmittedTests(username) {
    var result = [];

    await db
      .any(answersSQL.submittedTests, username)
      .then((data) => {
        // console.log(data);
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }


  static async getAnswers(info) {
    var result = [];

    await db
      .any(answersSQL.getAnswers, info)
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async deleteAnswers(info) {
    var result = [];

    await db
      .any(answersSQL.deleteAnswers, info)
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getSkillInfo(skillId) {
    var result = {};

    await db
      .one(skillsSQL.getSkill, skillId)
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        // console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getSkillsForTopic(topic) {
    var result = [];

    await db
      .any(skillsSQL.getSkillsForTopic, topic)
      .then((skills) => {
        // console.log('skills', skills);
        result = skills;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

}
