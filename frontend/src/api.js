import axios from "axios";
import { config } from "./constants";

const API_URL = "https://adaptivemaths.herokuapp.com";

// const API_URL = "http://localhost:5000";

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
      .post(`${API_URL}/sendMail`, data)
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