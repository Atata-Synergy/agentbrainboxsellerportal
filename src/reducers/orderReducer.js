import {
    GETS_RECEIVED_ORDERS,
    RECEIVED_ORDERS,
    RECEIVED_ORDER_ERROR,
    UPDATE_ORDER_STATUS,
    ORDER_STATUS_UPDATED,
    ORDER_STATUS_ERROR,
} from "../Actions/types";

const initialState = {
    /***********************/
    gettingOrders: false,
    receivedOrders: [],
    orderErrors: null,
    /**********************/
    updatingOrders: false,
    orderUpdated: false,
    orderUpdateErrors: null,
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
        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                updatingOrders: true,
                orderUpdateErrors: null,
            };
        case ORDER_STATUS_UPDATED:
            return {
                ...state,
                updatingOrders: false,
                orderUpdated: true,
            };
        case ORDER_STATUS_ERROR:
            return {
                ...state,
                updatingOrders: false,
                orderUpdateErrors: action.payload,
            };

        default:
            return state;
    }
}