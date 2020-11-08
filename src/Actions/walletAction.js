import API from '../Partials/API'
import {
    GET_WALLET_ACCESS,
    FUND_ACCOUNT,
    ACCOUNT_FUNDED,
    FUND_ERROR,
    ERROR_GETTING_WALLET_ACCESS,
    WALLET_INFO,
    WALLET_HISTORY,
    GET_WALLET_HISTORY,
    GET_WALLET_HISTORY_ERROR,
    WITHDRAW_SUCCESS,
    WITHDRAW,
    WITHDRAW_ERROR,
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
            dispatch({
                type: WALLET_HISTORY,
                payload: response.data.walletHistories
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

export const fundAccount = (data) => dispatch => {
    const userToken = localStorage.getItem(token)
    const { amount, reference } = data
    dispatch({ type: FUND_ACCOUNT })
    API.post('/merchants/wallet/fund', {
            amount,
            reference
        }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: ACCOUNT_FUNDED,
                payload: response.data
            })
            dispatch(getWalletInfo())
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: FUND_ERROR,
                payload: err.response
            })
        })
}

export const getWalletInfo = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_WALLET_HISTORY })
    API.get('/merchants/wallet', { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: WALLET_INFO,
                payload: response.data
            })
            dispatch({
                type: WALLET_HISTORY,
                payload: response.data.walletHistories
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_WALLET_HISTORY_ERROR,
                payload: err
            })
        })
}
export const withdrawFund = (amount_to_withdraw) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: WITHDRAW })
    API.post('/merchants/wallet/withdraw', { amount_to_withdraw }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: WITHDRAW_SUCCESS,
                payload: response.data
            })
            dispatch(getWalletInfo());
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: WITHDRAW_ERROR,
                payload: err
            })
        })
}