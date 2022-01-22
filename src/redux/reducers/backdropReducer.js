import * as actionTypes from "../constants/backdropConstants";

//intial state set...
const INTIAL_STATE = {
    backdrop: true,
}

export const backdropReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_BACKDROP:
            return {...state, backdrop: action.payload};
            default:
                return state;
    }
}