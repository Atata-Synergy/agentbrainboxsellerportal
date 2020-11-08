/**
 * Authentication
 */

//Login

export const LOGIN = "LOGIN"
export const USER = "USER"
export const ERROR_LOGGING = "ERROR_LOGGING"

//Register

export const REGISTER_USER = "REGISTER_USER"
export const REGISTRATION_ERROR = "REGISTRATION_ERROR"

/**
 * Creating Seller
 */

export const CREATE_MERCHANT = "CREATE_MERCHANT"
export const MERCHANT = "MERCHANT"
export const ERROR_CREATING_MERCHANT = "ERROR_CREATING_MERCHANT"

/**
 * PRODUCTS 
 */
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const PRODUCT_CREATED = "PRODUCT_CREATED"
export const PRODUCT_CREATE_ERROR = "PRODUCT_CREATE_ERROR"

export const CLEAR_STATUS_MESSAGE = "CLEAR_STATUS_MESSAGE"

export const GET_PRODUCT = "GET_PRODUCT"
export const PRODUCTS = "PRODUCTS"
export const PRODUCT = "PRODUCT"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const PRODUCT_DELETED = "PRODUCT_DELETED"
export const PRODUCT_DELETE_ERROR = "PRODUCT_DELETE_ERROR"

export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR"

export const TO_STEP_1 = "TO_STEP_1"
export const TO_STEP_2 = "TO_STEP_2"
export const TO_STEP_3 = "TO_STEP_3"
export const TO_STEP_0 = "TO_STEP_0"

/***ADVERT */
export const GET_AD_COST = "GET_AD_COST"
export const SET_AD_DATE = "SET_AD_DATE"
export const AD_COST = "AD_COST"
export const AD_COST_ERR = "AD_COST_ERR"
export const CREATE_AD = "CREATE_AD"
export const AD_CREATED = "AD_CREATED"
export const AD_CREATE_ERROR = "AD_CREATE_ERROR"

export const GET_ADVERTS = "GET_ADVERTS"
export const ADVERTS = "ADVERTS"
export const ADVERTS_ERROR = "ADVERTS_ERROR"


/***
 * ORDERS
 */

export const GETS_RECEIVED_ORDERS = "GETS_RECEIVED_ORDERS"
export const RECEIVED_ORDERS = "RECEIVED_ORDERS"
export const RECEIVED_ORDER_ERROR = "RECEIVED_ORDER_ERROR"

export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS"
export const ORDER_STATUS_UPDATED = "ORDER_STATUS_UPDATED"
export const ORDER_STATUS_ERROR = "ORDER_STATUS_ERROR"

/***
 * TRANSACTION
 */

export const GET_TRANSACTION = "GET_TRANSACTION"
export const TRANSACTIONS = "TRANSACTIONS"
export const ERROR_GETTING_TRANSACTIONS = "ERROR_GETTING_TRANSACTIONS"

/***
 *  WALLET 
 */
export const GET_WALLET_ACCESS = "GET_WALLET_ACCESS"
export const WALLET_ACCESS_TOKEN = "WALLET_ACCESS_TOKEN"
export const WALLET_INFO = "WALLET_INFO"
export const WALLET_HISTORY = "WALLET_HISTORY"
export const GET_WALLET_HISTORY = "GET_WALLET_HISTORY_ERROR"
export const GET_WALLET_HISTORY_ERROR = "GET_WALLET_HISTORY"
export const ERROR_GETTING_WALLET_ACCESS = "ERROR_GETTING_WALLET_ACCESS"

export const FUND_ACCOUNT = "FUND_ACCOUNT"
export const ACCOUNT_FUNDED = "ACCOUNT_FUNDED"
export const FUND_ERROR = "FUND_ERROR"

export const WITHDRAW = "WITHDRAW"
export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS"
export const WITHDRAW_ERROR = "WITHDRAW_ERROR"