import API from '../Partials/API'
import {
    LOGIN,
    LOGGING,
    STOP_LOGGING,
    ERROR_LOGGING
} from "./types";



export const login = (credentials) => dispatch => {
    dispatch({ type: LOGGING })
    API.post('/api/login', credentials)
        .then(response => {
            console.log(response.data)
            dispatch({ type: STOP_LOGGING })
            dispatch({
                type: LOGIN,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: STOP_LOGGING })
            dispatch({
                type: ERROR_LOGGING,
                payload: err.response
            })
        })
}