import { QueryFile } from "pg-promise";
import path from "path";

function sql(filename) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}

/*
  Exporting query files for all the SQL files to be used by Database
*/

export const mailingListSQL = {
  addMail: sql("../sql/mailing_list/addMail.sql"),
};

export const usersSQL = {
  addUser: sql("../sql/users/addUser.sql"),
  getUser: sql("../sql/users/getUser.sql"),
  deleteUser: sql("../sql/users/deleteUser.sql"),
  getUserWithEmail: sql("../sql/users/getUserWithEmail.sql"),
};

export const questionsSQL = {
  getPaperNames: sql("../sql/questions/getPaperNames.sql"),
  getQuestions: sql("../sql/questions/getQuestions.sql"),
};

export const answersSQL = {
  addAnswer: sql("../sql/answers/addAnswer.sql"),
  submittedTests: sql("../sql/answers/submittedTests.sql"),
  getAnswers: sql("../sql/answers/getAnswers.sql"),
  deleteAnswers: sql("../sql/answers/deleteAnswers.sql"),
};

export const testsSQL = {
  getTest: sql("../sql/tests/getTest.sql"),
};

export const skillsSQL = {
  getSkill: sql("../sql/skills/getSkill.sql"),
  getSkillsForTopic: sql("../sql/skills/getSkillsForTopic.sql"),
};

export const learningObjectivesSQL = {
  getLo: sql("../sql/learning_objectives/getLo.sql"),
  getSubLo: sql("../sql/learning_objectives/getSubLo.sql"),
};
