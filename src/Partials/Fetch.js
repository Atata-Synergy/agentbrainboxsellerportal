import API from "./API"

export default function fetchUser(userId) {
    return new Promise((res, rej) => {
        API.get('seller/profile/' + userId)
            .then(response => {
                res(response)
            })
            .catch(error => {
                rej(error)
            })
    })
}