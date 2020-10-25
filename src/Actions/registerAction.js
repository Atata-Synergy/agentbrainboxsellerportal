import API from '../Partials/API'
import {
    CREATING_SELLER,
    SELLER,
    STOP_CREATING_SELLER,
    ERROR_CREATING_SELLER,
    REGISTER_USER,
    USER,
    REGISTRATION_ERROR,
    MERCHANT,
    CREATE_MERCHANT,
    ERROR_CREATING_MERCHANT,
} from "./types";
import { token } from "../Partials/constant"
export const registerUser = (credentials) => dispatch => {
    dispatch({ type: REGISTER_USER })
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
            localStorage.removeItem(token)
            localStorage.setItem(token, response.data.data.token)
            dispatch({
                type: USER,
                payload: response.data.data.user
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: REGISTRATION_ERROR,
                payload: err.response && err.response.data
            })
        })
}

export const registerMerchant = (credentials) => dispatch => {
    const {
        business_name,
        business_email,
        business_phone,
        business_image,
        cityOrTown,
        TIN,
        BusinessRegistration,
        VATRegistrationStatus,
        Bank,
        Bank_code,
        Account_name,
        IBAN,
        Account_number,
        state,
        country,
        wallet_code,
        bank_name,
        account_holder_name,
        account_number,
        wallet_code_confirmation,
        iban,
        bvn,
        business_address,
    } = credentials
    dispatch({ type: CREATE_MERCHANT })
    const userToken = localStorage.getItem(token)
    API.post('/merchants', {
            business_name,
            business_email,
            business_phone,
            wallet_code,
            bank_name,
            account_holder_name,
            account_number,
            iban,
            bvn,
            business_image,
            city: cityOrTown,
            wallet_code_confirmation,
            TIN,
            BusinessRegistration,
            VATRegistrationStatus,
            Bank,
            state,
            country,
            Bank_code,
            Account_name,
            IBAN,
            business_address,
            Account_number,
        }, { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
            console.log(response.data)
            dispatch({
                type: MERCHANT,
                payload: response.data.merchant
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: ERROR_CREATING_MERCHANT,
                payload: err.response.data
            })
        })
}