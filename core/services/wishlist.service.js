import axios from "../config/axios";
import {
    ADD_ITEM_TO_WISHLIST, EMPTY_WISHLIST, LOAD_WISHLIST, REMOVE_ITEM_FROM_WISHLIST
} from "./apiUrl.service"

export const loadWishlist = () => {
    return axios.get(LOAD_WISHLIST).then((resp) => resp.data);
};

export const addItemToWishlist = (payload) => {
    return axios.post(ADD_ITEM_TO_WISHLIST, payload).then((resp) => resp.data);
};

export const removeItemFromWhislist = (payload) => {
    return axios.delete(REMOVE_ITEM_FROM_WISHLIST, { data: { item_id: payload } }).then((resp) => resp.data);
};

export const emptyWishlist = () => {
    return axios.delete(EMPTY_WISHLIST).then((resp) => resp.data);
};

