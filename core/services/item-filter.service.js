import { isArray } from "lodash";
import axios from "../config/axios";
import { LOAD_SEGMENTS, LOAD_BRANDS, LOAD_VARIANTS, LOAD_MANUFACTURERS } from "./apiUrl.service";

export const loadSegments = async (params=null,options) => {
    return axios.get(LOAD_SEGMENTS,options).then((resp) => resp.data);
};


export const loadBrands = async (segment_id = '',options = {}) => {  
    const apiUrl = LOAD_BRANDS + (segment_id !== '' ? '?segment_id=' + segment_id : '');
    return axios.get(apiUrl,options).then((resp) => resp.data);
};

export const loadVariants = async (brand_id) => {
    return axios.get(LOAD_VARIANTS + '?brand_id=' + brand_id).then((resp) => resp.data);
};

export const loadManufactures = async (type) => {
    return axios.get(LOAD_MANUFACTURERS + '?type=' + type).then((resp) => resp.data);
}