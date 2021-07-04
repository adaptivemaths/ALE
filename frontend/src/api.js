import axios from "axios";
import { config } from "./constants";

export async function addToMailingList(data) {
    var result = false;
    await axios
      .post(`${config.API_URL}/addToMailingList`, data)
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