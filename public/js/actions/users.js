import axios from 'axios';
import { ROOT_URL } from '../config.js';

// export function signInUser(formValues) {
//   const request = axios.post(`${ROOT_URL}/api/v1/users`, formValues);
//
//   return {
//     type: SIGNIN_USER,
//     payload: request
//   };
// }

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export function signinUser(formValues) {
  const request = axios.post(`${ROOT_URL}/api/v1/signin`, formValues);
  return {
    type: SIGNIN_USER,
    payload: request
  };
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}

export function signinUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
