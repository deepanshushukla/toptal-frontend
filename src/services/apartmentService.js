import fetchReq from '../utils/requestUtil'

import { APARTMENTS_URL } from '../constants/urls';

export const getAllApartments = (params) => {
    return fetchReq.get(APARTMENTS_URL,params);
};
export const saveApartment= (payload) => {
    return fetchReq.post(APARTMENTS_URL, payload);
};
export const updateApartment=(id, payload) => {
    return fetchReq.put(`${APARTMENTS_URL}/${id}`,payload);
};
export const deleteApartment = (id) => {
    return fetchReq.deleteReq(`${APARTMENTS_URL}/${id}`);
};
