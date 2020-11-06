import {
    GET_TRANSACTION,
    TRANSACTIONS,
    ERROR_GETTING_TRANSACTIONS,
} from "../Actions/types";

const initialState = {
    /***********************/
    gettingTransactions: false,
    transactions: [],
    transactionsErrors: null,
    /**********************/
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TRANSACTION:
            return {
                ...state,
                gettingTransactions: true,
                transactionsErrors: null,
            };
        case TRANSACTIONS:
            return {
                ...state,
                gettingTransactions: false,
                transactions: action.payload,
                transactionsErrors: null,
            };
        case ERROR_GETTING_TRANSACTIONS:
            return {
                ...state,
                gettingTransactions: false,
                transactionsErrors: action.payload,
            };

        default:
            return state;
    }
}