import axios from "../config/axios";
import { SUBSCRIBE_TO_NEWS_LETTER } from "./apiUrl.service";

export const newsLetter = (emailObj) => {
    // const emailObjString = new URLSearchParams(emailObj).toString(); 
    return axios.get(SUBSCRIBE_TO_NEWS_LETTER + '?email=' + emailObj).then((resp) => resp.data);
};