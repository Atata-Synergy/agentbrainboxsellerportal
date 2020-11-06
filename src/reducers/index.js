import { combineReducers } from 'redux'
import authReducer from './authReducer'
import productReducer from './productReducer'
import orderReducer from './orderReducer'
import transactionReducer from './transactionReducer'

export default combineReducers({
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    transaction: transactionReducer
})