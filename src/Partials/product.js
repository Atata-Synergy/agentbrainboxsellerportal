import axios from 'axios'
import API from './API'

export default function productInit({ productBasicInfo }) {
    return new Promise((res, rej) => {
        API.post('/products/create', productBasicInfo)
            .then(response => {
                res(response);
            })
            .catch(err => {
                rej(err)
            })
    })
}