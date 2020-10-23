import axios from 'axios'
import API from './API'
import jwt from "jsonwebtoken";

export function registerUser(credentials) {
    return new Promise((res, rej) => {
        API.post('/auth/register', credentials)
            .then(response => {
                res(response);
            })
            .catch(err => {
                rej(err)
            })
    })
}

export function registerSeller(credentials) {
    return new Promise((res, rej) => {
        API.post('/seller/register', credentials)
            .then(response => {
                res(response)
            })
            .catch(error => {
                rej(error)
            })
    })
}

export function login(credentials) {
    return new Promise((res, rej) => {
        API.post('/auth/login', credentials)
            .then(response => {
                res(response.data);
            })
            .catch(err => {
                rej('Wrong Email/Password combination.')
            })
    })
}

export default function verifyToken(Token) {
    return new Promise((res, rej) => {
        let TOKEN = Token;
        try {
            var decoded = jwt.verify(
                TOKEN,
                "q7TucOsJmVk4qVzqc0MSA2SnaLZka5F3b0Ad6z7OI4VCpxa0qsvFDkSkbpj1vro8"
            );
            res(decoded);
        } catch (err) {
            console.log(err);
            rej(err);
        }
    });
}