import {
    GET_WALLET_ACCESS,
    WALLET_ACCESS_TOKEN,
    WALLET_INFO,
    ERROR_GETTING_WALLET_ACCESS,
    WALLET_HISTORY,
    GET_WALLET_HISTORY_ERROR,
    FUND_ACCOUNT,
    ACCOUNT_FUNDED,
    FUND_ERROR,
    WITHDRAW,
    WITHDRAW_SUCCESS,
    WITHDRAW_ERROR,
} from "../Actions/types";

const initialState = {
    /***********************/
    authorizing: false,
    walletToken: null,
    walletErrors: null,
    walletHistory: [],
    walletInfo: {},
    loading: false,
    loadingText: null,
    withdrawFundError: null,
    withdrawSuccess: null,
    accountFundError: null
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
                loading: true,
                loadingText: 'Access wallet...',
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
                loading: false,
                loadingText: null,
                authorizing: false,
                walletErrors: null,
                walletInfo: action.payload
            };
        case WALLET_HISTORY:
            return {
                ...state,
                walletHistory: action.payload
            };

        case ERROR_GETTING_WALLET_ACCESS:
            return {
                ...state,
                loading: false,
                loadingText: null,
                authorizing: false,
                walletToken: null,
                walletErrors: action.payload,
                walletInfo: {}
            };
        case GET_WALLET_HISTORY_ERROR:
            return {
                ...state,
                loading: false,
                loadingText: null,
                walletErrors: action.payload,
            };
        case FUND_ACCOUNT:
            return {
                ...state,
                loading: true,
                withdrawSuccess: null,
                loadingText: 'uPdating your account ballance',
            };
        case ACCOUNT_FUNDED:
            return {
                ...state,
                loading: false,
                loadingText: null,
                withdrawSuccess: action.payload
            };
        case FUND_ERROR:
            return {
                ...state,
                loading: false,
                loadingText: null,
                accountFundError: action.payload
            };
        case WITHDRAW:
            return {
                ...state,
                loading: true,
                withdrawSuccess: null,
                loadingText: 'Please wait while we perform your request...',
            };
        case WITHDRAW_SUCCESS:
            return {
                ...state,
                withdrawSuccess: action.payload
            };
        case WITHDRAW_ERROR:
            return {
                ...state,
                loading: false,
                loadingText: null,
                withdrawFundError: action.payload
            };

        default:
            return state;
    }
}