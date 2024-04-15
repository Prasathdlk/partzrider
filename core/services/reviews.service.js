import axios from "../config/axios";
import { ADD_REVIEW } from "./apiUrl.service";

export const addReview = (payload) => {
    return axios.post(ADD_REVIEW, payload).then((resp) => resp.data);
};