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
  console.log("api username=", username);
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