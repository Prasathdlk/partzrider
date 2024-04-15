import axios from "../config/axios";
import { ADD_ITEM_TO_CART, LOAD_CART, REMOVE_ITEM_FROM_CART } from "./apiUrl.service";

export const loadCartItem = () => {
    return axios.get(LOAD_CART).then((resp) => resp.data);
}

export const addItemTocart = (item) => {
    return axios.post(ADD_ITEM_TO_CART, item).then((resp) => resp.data);
};

export const removeItemFromCart = (item) => {
    return axios.delete(REMOVE_ITEM_FROM_CART, { data: { item_id: item.item_id } }).then((resp) => resp.data);
};