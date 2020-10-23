import {
    LOGIN,
    LOGGING,
    STOP_LOGGING,
    ERROR_LOGGING,
    CREATING_SELLER,
    SELLER,
    STOP_CREATING_SELLER,
    ERROR_CREATING_SELLER,
    REGISTERED,
    IS_REGISTERING,
    STOP_REGISTERING,
    ERROR_REGISTERING,
} from "../Actions/types";

const initialState = {
    registerStatus: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTERED:
            return {
                ...state,
                registerStatus: action.payload
            };
        default:
            return state;
    }
}