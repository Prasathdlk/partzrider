import { CONTACT_US } from "./apiUrl.service";
import axios from "../config/axios";

export const contactUs = (payload) => {
    return axios.post(CONTACT_US, payload).then((resp) => resp.data);
};