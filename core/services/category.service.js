import axios from "../config/axios";
import { LOAD_CATEGORIES, LOAD_SUB_CATEGORIES, LOAD_END_CATEGORIES } from "./apiUrl.service";

export const getCategories = (params=null,options={}) => {
    return axios.get(LOAD_CATEGORIES,options).then((resp) => resp.data);
};

export const getSubCategories = (parent_category_id) => {
    return axios.get(LOAD_SUB_CATEGORIES + '?category_id=' + parent_category_id).then((resp) => resp.data);
};

export const getEndCategories = (sub_category_id) => {
    return axios.get(LOAD_END_CATEGORIES + '?sub_category_id=' + sub_category_id).then((resp) => resp.data);
};