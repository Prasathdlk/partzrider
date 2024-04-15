import { combineReducers } from "redux";

import account from './account';
import cartItems from "./cart";
import wishlistItems from "./whislist";
import common from "./common";

export default combineReducers({
    account,
    cartItems,
    wishlistItems,
    common
});
