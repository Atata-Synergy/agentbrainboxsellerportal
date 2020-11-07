import {
    GET_WALLET_ACCESS,
    WALLET_ACCESS_TOKEN,
    WALLET_INFO,
    ERROR_GETTING_WALLET_ACCESS,
} from "../Actions/types";

const initialState = {
    /***********************/
    authorizing: false,
    walletToken: null,
    walletErrors: null,
    walletInfo: {}
    /**********************/
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_WALLET_ACCESS:
            return {
                ...state,
                authorizing: true,
                walletToken: null,
                walletErrors: null,
                walletInfo: {}
            };
        case WALLET_ACCESS_TOKEN:
            return {
                ...state,
                authorizing: false,
                walletToken: action.payload,
                walletErrors: null,
            };
        case WALLET_INFO:
            return {
                ...state,
                authorizing: false,
                walletErrors: null,
                walletInfo: action.payload
            };
        case ERROR_GETTING_WALLET_ACCESS:
            return {
                ...state,
                authorizing: false,
                walletToken: null,
                walletErrors: action.payload,
                walletInfo: {}
            };

        default:
            return state;
    }
}