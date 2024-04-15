import {
    SET_COMMON_DATA, SET_COMMON_SETTINGS_DATA
} from "../constant";

export const addMasterSettings = (settings) => dispatch =>{
    dispatch({
        type: SET_COMMON_SETTINGS_DATA,
        payload: settings
    })
}