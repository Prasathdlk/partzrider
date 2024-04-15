import axios from "../config/axios";
import {
    LOAD_ITEMS_FOR_CHECKOUT_PAGE, PLACE_ORDER,
    GET_ESTIMATED_DELIVERY_DAYS, LOAD_SCHEME_DISCOUNT, GENERATE_PROPERTIES, LOAD_CANCEL_ORDER_REASON, CANCEL_ORDER, RETURN_OR_REPLACE_ORDER
} from "./apiUrl.service"

export const loadItemForCheckoutPage = (filterObj) => {
    const filterObjString = new URLSearchParams(filterObj).toString();
    return axios.get(LOAD_ITEMS_FOR_CHECKOUT_PAGE + '?' + filterObjString).then((resp) => resp.data);
};

export const placeOrder = (payload) => {
    return axios.post(PLACE_ORDER, payload).then((resp) => resp.data);
};

export const getEstimatedDeliveyDays = (deliveryObj) => {
    const deliveryObjString = new URLSearchParams(deliveryObj).toString();
    return axios.get(GET_ESTIMATED_DELIVERY_DAYS + '?' + deliveryObjString).then((resp) => resp.data);
};

export const loadSchemeDiscount = (item_id) => {
    const queryParams = new URLSearchParams({ item_id }).toString();
    return axios.get(LOAD_SCHEME_DISCOUNT + '?' + queryParams).then((resp) => resp.data);
};

export const generateProperties = (order_id) => {
    const queryParams = new URLSearchParams({ order_id }).toString();
    return axios.get(GENERATE_PROPERTIES + '?' + queryParams).then((resp) => resp.data);
};

export const loadCancelOrderReason = () => {
    return axios.get(LOAD_CANCEL_ORDER_REASON + '?type=cancel').then((resp) => resp.data);
};

export const loadReturnOrReplace = () => {
    return axios.get(LOAD_CANCEL_ORDER_REASON + '?type=return').then((resp) => resp.data);
}

export const cancelOrder = (payload) => {
    return axios.post(CANCEL_ORDER, payload).then((resp) => resp.data);
};

export const returnOrReplaceOrder  = (payload) => {
    return axios.post(RETURN_OR_REPLACE_ORDER, payload).then((resp) => resp.data);
};