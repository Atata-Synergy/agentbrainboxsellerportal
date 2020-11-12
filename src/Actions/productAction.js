import API from '../Partials/API'
import {
    CREATE_PRODUCT,
    PRODUCT_CREATED,
    PRODUCT_CREATE_ERROR,
    TO_STEP_2,
    GET_PRODUCT,
    PRODUCTS,
    GET_PRODUCT_ERROR,
    GET_AD_COST,
    AD_COST,
    AD_COST_ERR,
    CREATE_AD,
    AD_CREATED,
    AD_CREATE_ERROR,
    PRODUCT,
    DELETE_PRODUCT,
    PRODUCT_DELETED,
    PRODUCT_DELETE_ERROR,
    GET_ADVERTS,
    ADVERTS,
    ADVERTS_ERROR,
    GET_CATEGORY,
    CATEGORIES,
    CATEGORY_ERROR,
} from "./types";
import { token } from '../Partials/constant';

export const createProduct = ({ productData }) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: CREATE_PRODUCT })

    API.post('/merchants/products', {...productData }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: PRODUCT_CREATED,
                payload: response.data
            })
            dispatch({ type: TO_STEP_2 })
        })
        .catch(err => {
            alert(err.response.data ? err.response.data.error ||
                err.response.data.message : err.response.statusText || JSON.stringify(err))
            dispatch({
                type: PRODUCT_CREATE_ERROR,
                payload: err.response.data ? err.response.data.errors || err.response.data.error ||
                    err.response.data.message : err.response.statusText || JSON.stringify(err)
            })
        })
}

export const updateProduct = ({ productData }) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: CREATE_PRODUCT })

    API.put(`/merchants/products/${productData.id}`, {...productData }, { headers: { Authorization: `Bearer ${userToken}` } })
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

export const deleteProduct = (id) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: DELETE_PRODUCT })

    API.delete(`/merchants/products/${id}`, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: PRODUCT_DELETED,
                payload: response.data
            })
            dispatch({ type: TO_STEP_2 })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: PRODUCT_DELETE_ERROR,
                payload: err.response
            })
        })
}

export const getProducts = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_PRODUCT })

    API.get('/merchants/products', { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: PRODUCTS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const getProduct = (id) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_PRODUCT })

    API.get(`/merchants/products/${id}`, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: PRODUCT,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const getAdvertCost = (date) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_AD_COST })

    API.post('/merchants/ad/get_cost', { date }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: AD_COST,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: AD_COST_ERR,
                payload: err.response
            })
        })
}

export const createAd = (adData) => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: CREATE_AD })
    const {
        ElapseDate,
        productId
    } = adData
    API.post(`/merchants/ad/create/${productId}`, { ElapseDate }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: AD_CREATED,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: AD_CREATE_ERROR,
                payload: err.response
            })
        })
}

export const getAdvert = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_ADVERTS })


    API.get(`/merchants/ad`, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: ADVERTS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: ADVERTS_ERROR,
                payload: err.response
            })
        })
}
export const getCategories = () => dispatch => {
    const userToken = localStorage.getItem(token)
    dispatch({ type: GET_CATEGORY })


    API.get(`/categories`, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: CATEGORIES,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: CATEGORY_ERROR,
                payload: err.response
            })
        })
}