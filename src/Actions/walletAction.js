import API from '../Partials/API'
import {
    GET_WALLET_ACCESS,
    WALLET_ACCESS_TOKEN,
    ERROR_GETTING_WALLET_ACCESS,
    WALLET_INFO,
} from "./types";
import { token } from '../Partials/constant';
var CryptoJS = require("crypto-js");



export const getWalletAccess = (wallet_code) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_WALLET_ACCESS })

    API.post('/merchants/wallet/access', {
            wallet_code
        }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: WALLET_INFO,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: ERROR_GETTING_WALLET_ACCESS,
                payload: err.response
            })
        })
}