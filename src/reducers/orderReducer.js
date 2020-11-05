import {
    GETS_RECEIVED_ORDERS,
    RECEIVED_ORDERS,
    RECEIVED_ORDER_ERROR,
} from "../Actions/types";

const initialState = {
    /***********************/
    gettingOrders: false,
    receivedOrders: [],
    orderErrors: null,
    /**********************/

}

export default function(state = initialState, action) {
    switch (action.type) {
        case GETS_RECEIVED_ORDERS:
            return {
                ...state,
                gettingOrders: true,
                orderErrors: null,
            };
        case RECEIVED_ORDERS:
            return {
                ...state,
                gettingOrders: false,
                receivedOrders: action.payload,
                orderErrors: null,
            };
        case RECEIVED_ORDER_ERROR:
            return {
                ...state,
                gettingOrders: false,
                orderErrors: action.payload,

            };
        default:
            return state;
    }
}