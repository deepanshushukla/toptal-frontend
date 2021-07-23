import store from 'utils/localStorageUtil';

import {AUTH_DETAILS_LS_KEY} from 'constants/auth';
import EMPTY_OBJECT_READONLY from 'constants/emptyObject';



export const setAuthDetailsLS = (data: any) =>{
    store.set(AUTH_DETAILS_LS_KEY, {
      ...data
    });
}
/**
 * Responsible for extracting the user authentication info from the local storage.
 */
export const getAuthDetailsFromLS = () =>
    store.get(AUTH_DETAILS_LS_KEY) || EMPTY_OBJECT_READONLY;



/**
 * Removes the auth details from the localstorage.
 */
export const removeAuthDetailsFromLS = () => store.remove(AUTH_DETAILS_LS_KEY);


/**
 * This is an impure function accessing the local storage of the browser.
 * Checks whether user and authentication token is present in the LS or not.
 * If they are then the user is authenticated.
 * @returns {{isAuthenticated: boolean, userId: (number|string)}}
 */
export const isUserAuthorized = () => {
    const userAuthDetails = getAuthDetailsFromLS();

    let data = {
        isAuthenticated:!!userAuthDetails?.accessToken,
        ...userAuthDetails
    };
    if(data.isAuthenticated){
        setAuthDetailsLS(data);
    }
    return data;
};
// get access token from the localstprage
export const getAccessToken = () => {
    return getAuthDetailsFromLS()?.accessToken;
};

