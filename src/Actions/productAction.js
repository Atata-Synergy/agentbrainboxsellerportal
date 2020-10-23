import API from '../Partials/API'
import {
    CREATE_PRODUCT,
    PRODUCT_CREATED,
    PRODUCT_CREATE_ERROR,
    TO_STEP_2,
} from "./types";

export const createProduct = ({ credentials }) => dispatch => {
    dispatch({ type: CREATE_PRODUCT })
    API.post('/register', credentials)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: PRODUCT_CREATED,
                payload: response.data
            })
            dispatch({ type: TO_STEP_2 })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: PRODUCT_CREATE_ERROR,
                payload: err.response
            })
        })
}