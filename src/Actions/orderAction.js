import API from '../Partials/API'
import {
    GETS_RECEIVED_ORDERS,
    RECEIVED_ORDERS,
    RECEIVED_ORDER_ERROR,
    UPDATE_ORDER_STATUS,
    ORDER_STATUS_UPDATED,
    ORDER_STATUS_ERROR,
} from "./types";
import { token } from '../Partials/constant';



export const getOrders = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GETS_RECEIVED_ORDERS })

    API.get('/merchants/orders', { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: RECEIVED_ORDERS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: RECEIVED_ORDER_ERROR,
                payload: err.response
            })
        })
}

export const updateOrderStatus = (order_id, status) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: UPDATE_ORDER_STATUS })

    API.post('/merchants/orders/update_status', {
            order_id,
            status
        }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: ORDER_STATUS_UPDATED,
                payload: response
            })
            dispatch(getOrders)

        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: ORDER_STATUS_ERROR,
                payload: err.response
            })
        })
}