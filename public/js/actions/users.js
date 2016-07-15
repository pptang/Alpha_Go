import axios from 'axios';
import { ROOT_URL } from '../config.js';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

// Get User info from token in localStorage
export const GET_USER_FROM_TOKEN = "GET_USER_FROM_TOKEN";
export const GET_USER_FROM_TOKEN_SUCCESS = "GET_USER_FROM_TOKEN_SUCCESS";
export const GET_USER_FROM_TOKEN_FAILURE = "GET_USER_FROM_TOKEN_FAILURE";
export const RESET_TOKEN = "RESET_TOKEN";

export const LOGOUT_USER = 'LOGOUT_USER';

export function signInUser(formValues) {
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

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function signUpUser(formValues) {
  const request = axios.post(`${ROOT_URL}api/v1/signup`, formValues);
  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}

export function getUserFromToken(tokenFromStorage) {
  const request = axios.get(`${ROOT_URL}api/v1/getUser?token=${tokenFromStorage}`);

  return {
    type: GET_USER_FROM_TOKEN,
    payload: request
  };
}

export function getUserFromTokenSuccess(currentUser) {
  return {
    type: GET_USER_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function getUserFromTokenFailure(error) {
  return {
    type: GET_USER_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function resetToken() {
  return {
    type: RESET_TOKEN
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
