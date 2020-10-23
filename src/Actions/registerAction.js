import API from '../Partials/API'
import {
    CREATING_SELLER,
    SELLER,
    STOP_CREATING_SELLER,
    ERROR_CREATING_SELLER,
    REGISTERED,
    IS_REGISTERING,
    STOP_REGISTERING,
    ERROR_REGISTERING,
} from "./types";

export const registerUser = (credentials) => dispatch => {
    dispatch({ type: IS_REGISTERING })
    const {
        name,
        email,
        phone,
        country,
        state,
        city,
        address,
        password,
        confirm_password,
    } = credentials;
    API.post('/auth/register', {
            name,
            email,
            phone,
            country,
            state,
            city,
            address,
            password,
            confirm_password,
        })
        .then(response => {
            console.log(response.data)
            dispatch({ type: STOP_REGISTERING })
            dispatch({
                type: REGISTERED,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: STOP_REGISTERING })
            dispatch({
                type: ERROR_REGISTERING,
                payload: err.response
            })
        })
}

export function registerSeller(credentials) {
    dispatch({ type: CREATING_SELLER })
    API.post('/register', credentials)
        .then(response => {
            console.log(response.data)
            dispatch({ type: STOP_CREATING_SELLER })
            dispatch({
                type: SELLER,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({ type: STOP_CREATING_SELLER })
            console.log(err)
            dispatch({
                type: ERROR_CREATING_SELLER,
                payload: err.response
            })
        })
}