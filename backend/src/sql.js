import { QueryFile } from "pg-promise";
import path from "path";

function sql(filename) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}


export const mailingListSQL = {
  addMail: sql("../sql/mailing_list/addMail.sql")
}

export const usersSQL = {
  addUser: sql("../sql/users/addUser.sql"),
  getUser: sql("../sql/users/getUser.sql"),
  deleteUser: sql("../sql/users/deleteUser.sql")
}

export const questionsSQL = {
  getPaperNames: sql("../sql/questions/getPaperNames.sql"),
  getQuestions: sql("../sql/questions/getQuestions.sql")
}

export const answersSQL = {
  addAnswer: sql("../sql/answers/addAnswer.sql"),
  submittedTests: sql("../sql/answers/submittedTests.sql"),
  getAnswers: sql("../sql/answers/getAnswers.sql"),
}