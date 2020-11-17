import API from '../Partials/API'
import {
    LOGIN,
    LOGGING,
    STOP_LOGGING,
    ERROR_LOGGING,
    USER,
    MERCHANT
} from "./types";
import { token } from '../Partials/constant';



export const login = (credentials) => dispatch => {
    const { email, password } = credentials
    dispatch({ type: LOGIN })
    API.post('/auth/login', { email, password })
        .then(response => {
            console.log(response.data.data.user)
            localStorage.removeItem(token)
            localStorage.setItem(token, response.data.data.token)
            dispatch({
                type: USER,
                payload: response.data.data.user
            })
        })
        .catch(err => {
            console.log(err.response)
            window.location.href = '/'
            dispatch({
                type: ERROR_LOGGING,
                payload: err.response ? err.response.data.errors || err.response.data.message : JSON.stringify(err)
            })
        })
}
export const logout = () => dispatch => {
    dispatch({ type: LOGIN })
    API.get('/auth/logout')
        .then(response => {
            localStorage.removeItem(token)
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: ERROR_LOGGING,
                payload: err.response ? err.response.data.errors || err.response.data.message : JSON.stringify(err)
            })
        })
}

export const me = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: LOGIN })

    API.get('/auth/me', { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)

            dispatch({
                type: USER,
                payload: response.data.user
            })
            dispatch({
                type: MERCHANT,
                payload: response.data.merchant
            })
        })
        .catch(err => {
            console.log(err.response)
            window.location.href = '/'

            dispatch({
                type: ERROR_LOGGING,
                payload: err.response ? err.response.data.errors || err.response.data.message : JSON.stringify(err)
            })
        })
}