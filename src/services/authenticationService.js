import fetchReq from '../utils/requestUtil'
import {LOGIN_URL, SIGNUP_URL, USRES_URL} from '../constants/urls';

export const loginUser=( payload )=>{
    return fetchReq.post(LOGIN_URL, payload, false);

};
export const userSignup=( payload)  => {
    return fetchReq.post(SIGNUP_URL, payload, false);
};
export const forgotPassword=( payload)  => {
    return fetchReq.post(`${USRES_URL}/forgotPassword`, payload, false);
};
export const resetPassword=( payload)  => {
    return fetchReq.post(`${USRES_URL}/resetPassword`, payload, false);
};

