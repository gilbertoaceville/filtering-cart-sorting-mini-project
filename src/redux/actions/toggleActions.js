import * as actionTypes from "../constants/toggleConstants";

export const Toggler = payload => async (dispatch) => {
    dispatch({
        type: actionTypes.ADD_TOGGLE,
        payload
    })
}