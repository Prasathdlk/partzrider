import { ADD_ITEM_TO_WISHLIST, EMPTY_WISHLIST, REMOVE_ITEM_FROM_WISHLIST } from "../constant";

const initialState = {
    wishList: []
};

const wishlistItems = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_WISHLIST:
            return {
                ...state,
                wishList: [...state.wishList, action.payload],
            }
        case REMOVE_ITEM_FROM_WISHLIST:
            let item = state.wishList.find(item => item.item_id === action.payload.item_id);
            let filter = item && state.wishList.filter(item => item.item_id !== action.payload.item_id);
            return {
                ...state,
                wishList: filter
            }
        case EMPTY_WISHLIST:
            return {
                ...state,
                wishList: []
            }
        default:
            return {
                ...state
            }
    }
};

export default wishlistItems;