import * as actionTypes from "../constants/backdropConstants";

export const BackdropToggler = payload => async (dispatch) => {
    dispatch({
        type: actionTypes.TOGGLE_BACKDROP,
        payload
    })
}