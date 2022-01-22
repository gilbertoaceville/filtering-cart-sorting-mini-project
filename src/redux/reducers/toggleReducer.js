import * as actionTypes from "../constants/toggleConstants";

//intial state set...
const INTIAL_STATE = {
    toggle: false,
}

export const toggleReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_TOGGLE:
            return {...state, toggle: action.payload};
            default:
                return state;
    }
}