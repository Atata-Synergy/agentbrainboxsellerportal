import {
    LOGIN,
    ERROR_LOGGING,
    USER,
    REGISTER_USER,
    REGISTRATION_ERROR,
    CREATE_MERCHANT,
    MERCHANT,
    ERROR_CREATING_MERCHANT,
} from "../Actions/types";

const initialState = {
    /****Registration****/
    registerStatus: null,
    isLoggingIn: false,
    user: {},
    isRegistering: false,
    registrationError: null,
    loginError: null,
    /**********************/
    creatingMerchant: false,
    merchant: {},
    merchantError: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: {},
                isRegistering: true,
                registrationError: null,
            };
        case LOGIN:
            return {
                ...state,
                isLoggingIn: true,
                loginError: null,
            };
        case ERROR_LOGGING:
            return {
                ...state,
                isLoggingIn: false,
                loginError: action.payload,

            };
        case USER:
            return {
                ...state,
                isLoggingIn: false,
                user: action.payload,
                isRegistering: false,
                registrationError: null,
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                isRegistering: false,
                registrationError: action.payload,

            };
        case CREATE_MERCHANT:
            return {
                ...state,
                creatingMerchant: true,
                merchant: {},
                merchantError: null,

            };
        case MERCHANT:
            return {
                ...state,
                creatingMerchant: false,
                merchant: action.payload,

            };
        case ERROR_CREATING_MERCHANT:
            return {
                ...state,
                creatingMerchant: false,
                merchantError: action.payload,

            };

        default:
            return state;
    }
}