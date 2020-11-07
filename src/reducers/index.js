import { combineReducers } from 'redux'
import authReducer from './authReducer'
import productReducer from './productReducer'
import orderReducer from './orderReducer'
import transactionReducer from './transactionReducer'
import walletReducer from './walletReducer'

export default combineReducers({
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    transaction: transactionReducer,
    wallet: walletReducer
})