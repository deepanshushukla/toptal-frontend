import fetchReq from '../utils/requestUtil'
import {LOGIN_URL,SIGNUP_URL} from '../constants/urls';

export const loginUser=( payload )=>{
    return fetchReq.post(LOGIN_URL, payload, false);

};
export const userSignup=( payload)  => {
    return fetchReq.post(SIGNUP_URL, payload, false);

};