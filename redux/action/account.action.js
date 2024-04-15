import {
    SET_LOGGED_IN_USER, SET_PROFILE_USER, REMOVE_LOGGED_IN_USER, SET_FORGOT_USER,
    ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QTY_TO_CART, REMOVE_ALL_CART,
    ADD_ITEM_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST,
    SET_SEARCH_FILTERS, RESET_SEARCH_FILTERS, MODIFY_SEGMENT_IN_SEARCH, MODIFY_BRAND_IN_SEARCH,
    MODIFY_VARIANT_IN_SEARCH, MODIFY_CATEGORY_IN_SEARCH,MODIFY_QUERY_IN_SEARCH, EMPTY_WISHLIST,
    MODIFY_MANUFACTURE_IN_SEARCH
} from "../constant";

export const loginAction = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOGGED_IN_USER,
            information: 'user stored data',
            payload: user,
        });
        resolve();
    });
};

export const logoutAction = () => dispatch => {
    dispatch({
        type: REMOVE_LOGGED_IN_USER,
        information: 'user removed in from stored',
        payload: {
            isLoggedIn: false,
            token: '',
            authUser: '',
            profileUser: ''
        }
    });
};

export const saveUserAction = (profileUser) => dispatch => {
    dispatch({
        type: SET_PROFILE_USER,
        information: 'user profile data',
        payload: profileUser,
    });
};

export const forgotAction = (user) => dispatch => {
    dispatch({
        type: SET_FORGOT_USER,
        information: 'user forgot data',
        payload: user,
    });
};

export const addToCart = (item) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    });
};

export const removeFromCart = (item) => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    });
};

export const updateQtytocart = (item, qty) => dispatch => {
    dispatch({
        type: UPDATE_QTY_TO_CART,
        payload: {
            item, qty
        }
    })
}

export const removeAllCart = () => dispatch => {
    dispatch({
        type: REMOVE_ALL_CART,
        payload: {}
    });
};

export const setSearchFilters = (filters) => dispatch => {
    dispatch({
        type: SET_SEARCH_FILTERS,
        payload: filters
    });
};

export const resetSearchFilters = () => dispatch => {
    dispatch({
        type: RESET_SEARCH_FILTERS,
        payload: {}
    });
};

export const modifyManufactureInSearchFilter = (manufactureArr) => dispatch => {
    dispatch({
        type:MODIFY_MANUFACTURE_IN_SEARCH,
        payload: manufactureArr
    })
}

export const modifySegmentInSearchFilter = (segmentArr) => dispatch => {
    dispatch({
        type: MODIFY_SEGMENT_IN_SEARCH,
        payload: segmentArr
    });
};

export const modifyBrandInSearchFilter = (brandArr) => dispatch => {
    dispatch({
        type: MODIFY_BRAND_IN_SEARCH,
        payload: brandArr
    });
};

export const modifyVariantInSearchFilter = (variant_id) => dispatch => {
    dispatch({
        type: MODIFY_VARIANT_IN_SEARCH,
        payload: variant_id
    });
};

export const modifyCategoryInSearchFilter = (categoryArr) => dispatch => {
    dispatch({
        type: MODIFY_CATEGORY_IN_SEARCH,
        payload: categoryArr
    });
};

export const modifyQueryInSearchFilter = (search_qry) => dispatch => {
    dispatch({
        type: MODIFY_QUERY_IN_SEARCH,
        payload: search_qry
    });
};

export const addToWishlist = (item) => dispatch => {
    dispatch({
        type: ADD_ITEM_TO_WISHLIST,
        payload: item
    })
};

export const removeFromWishlist = (item) => dispatch => {
    dispatch({
        type: REMOVE_ITEM_FROM_WISHLIST,
        payload: item
    })
};

export const emptyWishlist = () => dispatch => {
    dispatch({
        type: EMPTY_WISHLIST,
        payload: {}
    })
};

// carts: [
// {id: 1, qty: 3},
// // {id: 9, qty: 1},
// ]
// step : 1 -> addtocart - dispatch
// step : 2 -> addtocart (9)- dispatch
// step : 3 -> removecart (9)- dispatch
// step : 4 -> updateQtytocart (9(product_id), 3(qty))- dispatch