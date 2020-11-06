import API from '../Partials/API'
import {
    GET_TRANSACTION,
    TRANSACTIONS,
    ERROR_GETTING_TRANSACTIONS,
} from "./types";
import { token } from '../Partials/constant';



export const getTransactions = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_TRANSACTION })

    API.get('/merchants/transaction', { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: TRANSACTIONS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: ERROR_GETTING_TRANSACTIONS,
                payload: err.response
            })
        })
}