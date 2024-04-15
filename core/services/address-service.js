import axios from "../config/axios";
import {
    ADD_ADDRESS, DELETE_ADDRESS, EDIT_ADDRESS, LOAD_ADDRESS_DETAILS,
    LOAD_ALL_ADDRESS, LOAD_CITY, LOAD_COUNTRY, LOAD_STATE, MAKE_DEFAULT_ADDRESS
} from "./apiUrl.service";

export const loadCountry = async () => {
    return axios.get(LOAD_COUNTRY).then((resp) => resp.data);
};

export const loadState = async () => {
    return axios.get(LOAD_STATE).then((resp) => resp.data);
};

export const loadCity = (state_id) => {
    return axios.get(LOAD_CITY + '?state_id=' + state_id).then((resp) => resp.data);
};

export const addAddress = (payload) => {
    return axios.post(ADD_ADDRESS, payload).then((resp) => resp.data);
};

export const loadAllAddress = () => {
    return axios.get(LOAD_ALL_ADDRESS).then((resp) => resp.data);
};

export const loadAddressDetails = (address_id) => {
    return axios.get(LOAD_ADDRESS_DETAILS + '?address_id=' + address_id).then((resp) => resp.data);
};

export const updateAddress = (payload) => {
    return axios.put(EDIT_ADDRESS, payload).then((resp) => resp.data);
};

export const deleteAddress = (address_id) => {
    return axios.delete(DELETE_ADDRESS + '?address_id=' + address_id).then((resp) => resp.data);
};

export const defaultAddress = (address_id) => {
    return axios.put(MAKE_DEFAULT_ADDRESS + '?address_id=' + address_id, {}).then((resp) => resp.data);
};