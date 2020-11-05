import API from '../Partials/API'
import {
    GETS_RECEIVED_ORDERS,
    RECEIVED_ORDERS,
    RECEIVED_ORDER_ERROR,
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