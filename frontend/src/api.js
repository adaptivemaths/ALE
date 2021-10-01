import axios from "axios";
import { config, axiosConfig } from "./constants";

const API_URL = config.API_URL;

export async function addToMailingList({ email }) {
  // Add email to database and send automated confirmation email
  var result = false;

  await axios
    .post(`${API_URL}/addToMailingList`, { email })
    .then((res) => {
      const email = res.data;
      result = email;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function addUser(accountDetails) {
  var result = false;
  await axios
    .post(`${API_URL}/signup/addUser`, accountDetails)
    .then((res) => {
      const user = res.data;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function loginUser(loginCredentials) {
  var result = false;
  await axios
    .post(`${API_URL}/users/login`, loginCredentials, axiosConfig)
    .then((res) => {
      const success = res.data.success;
      result = success;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getUserDetails(userCredentials) {
  var result = {};
  await axios
    .post(`${API_URL}/user/info`, userCredentials, axiosConfig)
    .then((res) => {
      const user = res.data;
      result = user;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("results", result);
  return result;
}

export async function getPaperNames() {
  var result = {};
  await axios
    .get(`${API_URL}/assessments/getPaperNames`)
    .then((res) => {
      const papers = res.data;
      result = papers;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getPaperInfo({ testId }) {
  var result = {};
  await axios
    .post(`${API_URL}/paper/info`, { testId })
    .then((res) => {
      const paper = res.data;
      result = paper;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getQuestions(paper) {
  var result = {};
  await axios
    .post(`${API_URL}/assessments/getQuestions`, paper)
    .then((res) => {
      const questions = res.data;
      result = questions;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function deleteAccount(user) {
  var result = {};
  await axios
    .post(`${API_URL}/user/deleteUser`, user)
    .then((res) => {
      const questions = res.data;
      result = questions;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function addAnswer(answer) {
  var result = {};
  console.log(answer);
  await axios
    .post(`${API_URL}/user/addAnswer`, answer)
    .then((res) => {
      const answer = res.data;
      result = answer;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getSubmittedTests({ userId }) {
  var result = {};
  await axios
    .post(`${API_URL}/user/getSubmittedTests`, { userId })
    .then((res) => {
      const answer = res.data;
      result = answer;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getAnswers(data) {
  var result = {};
  await axios
    .post(`${API_URL}/user/getAnswers`, data)
    .then((res) => {
      const answer = res.data;
      result = answer;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function deleteAnswers(data) {
  var result = {};
  await axios
    .post(`${API_URL}/user/deleteAnswers`, data)
    .then((res) => {
      const answer = res.data;
      result = answer;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getSkill(skillId) {
  var result = {};
  await axios
    .post(`${API_URL}/skills/info`, { skillId })
    .then((res) => {
      const answer = res.data;
      result = answer;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getSkillsForTopic(topic) {
  var result = [];
  await axios
    .post(`${API_URL}/skills/forTopic`, { topic })
    .then((res) => {
      const skills = res.data;
      result = skills;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getLo(lo) {
  var result = [];
  await axios
    .post(`${API_URL}/lo/info`, { lo })
    .then((res) => {
      const skills = res.data;
      result = skills;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function addAnswerToPoints(userId, lo, correct) {
  await axios
    .post(`${API_URL}/user/addAnswerToPoints`, { userId, lo, correct })
    .catch((error) => {
      console.log(error);
    });
}

export async function learningOutcomeRankings(
  userId,
  topic = undefined,
  byTopic = false
) {
  var loRankings = [];
  await axios
    .post(`${API_URL}/user/learningOutcomeRankings`, { userId, topic, byTopic })
    .then((res) => {
      loRankings = res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return loRankings;
}

export async function addTeacher(teacher) {
  var result = {};
  await axios
    .post(`${API_URL}/teachers/signup`, teacher)
    .then((res) => {
      const { data } = res;
      result = data;
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}

export async function getAllUsers() {
  var result = {};
  await axios
    .get(`${API_URL}/users/all`)
    .then((res) => {
      const { data } = res;
      result = data;
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}
