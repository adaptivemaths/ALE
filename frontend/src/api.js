import axios from "axios";
import { config, axiosConfig } from "./constants";

// const API_URL = "https://adaptivemaths.herokuapp.com";

const API_URL = "http://localhost:5000";

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

export async function sendMailListConfirmationMail(data) {
    var result = false;
    console.log(API_URL);
    await axios
      .post(`${API_URL}/mailingListConfirmationMail`, data)
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
      console.log(success);
      result = success;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}