import { combineReducers } from 'redux'
import registerReducer from './registerReducer'
import productReducer from './productReducer'

export default combineReducers({
    auth: registerReducer,
    product: productReducer
})