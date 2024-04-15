import axios from "../config/axios";
import {
    LOGIN_URL, LOAD_PROFILE, REGISTER_URL, FORGOT_PASSWORD_URL,
    CHANGE_FORGOT_PASSWORD, CHECK_EMAIL_AVAILABILITY, CHANGE_PASSWORD, GENERATE_OTP, UPDATE_PROFILE, LOAD_DELETE_REASONS, DEACTIVE_ACCOUNT
} from "./apiUrl.service";

export const login = async (payload) => {
    return axios.post(LOGIN_URL, payload).then((resp) => resp.data);
};

export const loadProfile = async () => {
    return axios.get(LOAD_PROFILE).then((resp) => resp.data);
};

export const logout = () => {
    return localStorage.removeItem('user');
};

export const register = async (payload) => {
    return axios.post(REGISTER_URL, payload).then((resp) => resp.data);
};

export const forgotPassword = async (payload) => {
    const payloadQuery = new URLSearchParams(payload).toString();
    return axios.get(FORGOT_PASSWORD_URL + '?' + payloadQuery).then((resp) => resp.data);
};

export const changeForgotPassword = async (payload) => {
    return axios.post(CHANGE_FORGOT_PASSWORD, payload).then((resp) => resp.data);
};


export const checkEmailAvailability = (emailObj) => {
    return axios.get(CHECK_EMAIL_AVAILABILITY + '?email_id=' + emailObj).then((resp) => resp.data);
};

export const changePassword = (payload) => {
    return axios.post(CHANGE_PASSWORD, payload).then((resp) => resp.data);
};

export const generateOTP = (mobile_no) => {
    return axios.get(GENERATE_OTP + '?mobile_no=' + mobile_no).then((resp) => resp.data);
};

export const updateProfile = async (payload) => {
    return axios.post(UPDATE_PROFILE, payload).then((resp) => resp.data);
};

export const loadDeleteReason = () => {
    return axios.get(LOAD_DELETE_REASONS).then((resp) => resp.data);
};

export const deActiveAccount = (deleteReasonObj) => {
    return axios.post(DEACTIVE_ACCOUNT,  deleteReasonObj).then((resp) => resp.data);
};