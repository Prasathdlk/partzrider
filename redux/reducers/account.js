// import constant
import {
    SET_LOGGED_IN_USER, SET_PROFILE_USER,
    SET_FORGOT_USER, REMOVE_LOGGED_IN_USER,
    SET_SEARCH_FILTERS, RESET_SEARCH_FILTERS, MODIFY_SEGMENT_IN_SEARCH, MODIFY_BRAND_IN_SEARCH,
    MODIFY_VARIANT_IN_SEARCH, MODIFY_CATEGORY_IN_SEARCH, MODIFY_QUERY_IN_SEARCH, MODIFY_MANUFACTURE_IN_SEARCH
} from '../constant';
import { setAuthUser, removeAuthUser } from 'core/helper/localstorage';

const initialState = {
    isLoggedIn: false,
    isFilterSet: false,
    filters: {
        categories: [],
        segments: [],
        brands: [],
        variants: [],
        manufacturers: [],
        search_qry: "",
    },
    token: '',
    authUser: '',
    profileUser: '',
    forgotUser: {
        username: '',
        // code: ''
    }
};

const account = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LOGGED_IN_USER:
            setAuthUser(payload);
            return {
                ...state,
                ...payload
            }
        case REMOVE_LOGGED_IN_USER:
            removeAuthUser();
            return {
                ...state,
                ...payload
            }
        case SET_PROFILE_USER:
            return {
                ...state,
                ...payload
            }
        case SET_FORGOT_USER:
            return {
                ...state,
                ...payload
            }
        case SET_SEARCH_FILTERS:
            return {
                ...state,
                ...{
                    isFilterSet: true,
                    filters: {
                        ...state.filters,
                        ...payload
                    }
                }

            }
        case RESET_SEARCH_FILTERS:
            return {
                ...state,
                ...{
                    isFilterSet: false,
                    filters: {}
                }

            }
        case MODIFY_SEGMENT_IN_SEARCH:
            return {
                ...state,
                ...{
                    isFilterSet: true,
                    filters: {
                        ...state.filters,
                        segments: payload.length > 0 ? payload : []
                    }
                }
            }
        case MODIFY_BRAND_IN_SEARCH:
            return {
                ...state,
                ...{
                    isFilterSet: true,
                    filters: {
                        ...state.filters,
                        brands: payload.length > 0 ? payload : []
                    }
                }
            }
        case MODIFY_VARIANT_IN_SEARCH:
            return {
                ...state,
                ...{
                    isFilterSet: true,
                    filters: {
                        ...state.filters,
                        variants: !!payload ? payload : []
                    }
                }
            }
        case MODIFY_CATEGORY_IN_SEARCH:
            return {
                ...state,
                ...{
                    isFilterSet: true,
                    filters: {
                        ...state.filters,
                        categories: payload.length > 0 ? payload : []
                    }
                }
            }
      
      case MODIFY_MANUFACTURE_IN_SEARCH:
                return {
                    ...state,
                    ...{
                        isFilterSet: true,
                        filters: {
                            ...state.filters,
                            manufacturers: payload.length > 0 ? payload : []
                        }
                    }
                }
            
        case MODIFY_QUERY_IN_SEARCH:
            return {
                ...state,
                ...{
                    isFilterSet: true,
                    filters: {
                        ...state.filters,
                        search_qry: payload
                    }
                }
            }


           
        default:
            return {
                ...state
            };
    }

}

export default account;