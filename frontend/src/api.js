import axios from "axios";
import { config, axiosConfig } from "./constants";

// const API_URL = "https://adaptivemaths.herokuapp.com";

// const API_URL = "http://localhost:5000";
const API_URL = config.API_URL;

export async function addToMailingList(data) {
    var result = false;
    console.log(API_URL);
    await axios
      .post(`${API_URL}/addToMailingList`, data)
      .then((res) => {
        const email = res.data;
        console.log(email);
        console.log('api call')
        result = email;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
}

export async function addUser(accountDetails) {
  var result = false;
  console.log(API_URL);
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
      console.log("Status:", success);
      result = success;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getUserDetails(username) {
  var result = {}
  await axios
    .post(`${API_URL}/user/info`, username, axiosConfig)
    .then((res) => {
      const user = res.data;
      result = user;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function getPaperNames() {
  var result = {}
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

export async function getQuestions(paper) {
  var result = {}
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
  var result = {}
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