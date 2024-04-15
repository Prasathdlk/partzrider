import axios from "../config/axios";
import {
    GET_MASTER_SETTINGS
} from "./apiUrl.service";

export const getMasterSettings = () => {
    return axios.get(GET_MASTER_SETTINGS).then((resp) => resp.data);
};