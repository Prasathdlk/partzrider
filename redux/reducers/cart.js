// reference : https://github.com/AyaBellazreg/React-Shopping-Cart/blob/db1a9002569649c09b9f5159cfdd620c6d70e1db/Shopping-Cart/src/components/reducers/cartReducer.js

import {
    ADD_TO_CART, REMOVE_ALL_CART, REMOVE_FROM_CART,
    UPDATE_QTY_TO_CART, ADD_QTY_TO_CART, SUB_QTY_TO_CART
} from "../constant";

const initialState = {
    cartIndex: 0,
    total: 0,
    cart: [],
}

const cartItems = (state = initialState, action) => {
    const { payload } = action;
    let newTotal;
    switch (action.type) {
        case ADD_TO_CART:
            //check if the action id exists in the addedItems
            let existed_item = state.cart.find(item => payload.item_id === item.item_id)
            if (existed_item) {
                const cartIdx = state.cart.findIndex((item) => item.item_id === payload.item_id);
                state.cart[cartIdx].qty = payload.qty;
                return {
                    ...state,
                    total: state.total + parseFloat(payload.price)
                }
            } else {
                //calculating the total
                newTotal = state.total + parseFloat(payload.price)

                return {
                    ...state,
                    cart: [...state.cart, payload],
                    total: newTotal
                }
            }
        case REMOVE_FROM_CART:
            let itemToRemove = state.cart.find(item => payload.item_id === item.item_id);
            let new_items = state.cart.filter(item => payload.item_id !== item.item_id);

            //calculating the total
            newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);

            return {
                ...state,
                cart: new_items,
                total: newTotal
            }
        case ADD_QTY_TO_CART:
            const cartIdx1 = state.cart.findIndex((item) => item.item_id === payload.item_id);
            state.cart[cartIdx1].qty += 1;
            newTotal = state.total + parseFloat(payload.price);
            return {
                ...state,
                total: newTotal
            }
        case SUB_QTY_TO_CART:
            const cartIdx2 = state.cart.findIndex((item) => item.item_id === payload.item_id);
            if (state.cart[cartIdx2].qty === 1) {
                let new_items = state.cart.filter(item => item.item_id !== payload.item_id)
                let newTotal = state.total - parseFloat(payload.price);
                return {
                    ...state,
                    cart: new_items,
                    total: newTotal
                }
            } else {
                state.cart[cartIdx2].qty -= 1;
                let newTotal = state.total - parseFloat(payload.price);
                return {
                    ...state,
                    total: newTotal
                }
            }
        case UPDATE_QTY_TO_CART:
            return {
                ...state,
            }
        case REMOVE_ALL_CART:
            return {
                ...state,
                cart: []
            }
        default:
            return {
                ...state
            }
    };
};

export default cartItems;
