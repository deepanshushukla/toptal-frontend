import fetchReq from '../utils/requestUtil'
import {USRES_URL} from '../constants/urls';

export const getAllUsers=()=>{
    return fetchReq.get(USRES_URL);
};
export const saveUser=(payload)=>{
    return fetchReq.post(USRES_URL,payload);
};
export const updateUser=(id, payload)=>{
    return fetchReq.put(`${USRES_URL}/${id}`,payload);
};
export const deleteUser = (id)=>{
    return fetchReq.deleteReq(`${USRES_URL}/${id}`);
};
