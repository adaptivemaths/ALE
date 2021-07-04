import axios from "axios";
// import { config } from "./constants";
const API_URL = 'https://adaptivemaths.herokuapp.com/';
export async function addToMailingList(data) {
    var result = false;
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