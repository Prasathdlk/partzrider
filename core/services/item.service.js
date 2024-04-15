import axios from "../config/axios";
import {
    BEST_SELLING_PRODUCTS, LOAD_ITEMS_BASED_ON_FILTER,
    LOAD_ITEM_ATTRIBUTES, LOAD_ITEM_DETAILS, LOAD_SEARCH_ITEMS,
    LOAD_ORDERS, LOAD_ORDER_DETAILS
} from "./apiUrl.service"

export const loadItems = (page, pageSize, filterObj = {}, options={}) => {
    filterObj.page_no = page;
    filterObj.page_size = pageSize;
    return axios.post(LOAD_ITEMS_BASED_ON_FILTER, filterObj,options).then((resp) => resp.data);
};

export const loadItemDetails = (itemId) => {
    return axios.get(LOAD_ITEM_DETAILS + '?item_id=' + itemId).then((resp) => resp.data);
};

export const loadItemAttributes = (itemId) => {
    return axios.get(LOAD_ITEM_ATTRIBUTES + '?item_id=' + itemId).then((resp) => resp.data);
};

export const bestSellingProducts = (page, pageSize) => {
    return axios.get(BEST_SELLING_PRODUCTS + '?page_no=' + page + '&page_size=' + pageSize).then((resp) => resp.data);
};

export const getSearchItems = (search_qry) => {
    return axios.get(LOAD_SEARCH_ITEMS + '?search_qry=' + search_qry).then((resp) => resp.data);
};

export const loadOrders = () => {
    return axios.get(LOAD_ORDERS).then((resp) => resp.data);
};

export const load_order_details = (customer_order_id) => {
    return axios.get(LOAD_ORDER_DETAILS + '?customer_order_id=' + customer_order_id).then((resp) => resp.data);
};

