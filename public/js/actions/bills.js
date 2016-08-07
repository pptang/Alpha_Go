import axios from 'axios';
import { ROOT_URL } from '../config.js';

export const SEND_BILLS = "SEND_BILLS";
export const SEND_BILLS_SUCCESS = "SEND_BILLS_SUCCESS";
export const SEND_BILLS_FAILURE = "SEND_BILLS_FAILURE";

export function sendBills(body, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: body,
    url: `${ROOT_URL}api/v1/sendBills`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: SEND_BILLS,
    payload: request
  }
}

export function sendBillsSuccess(response) {
  return {
    type: SEND_BILLS_SUCCESS,
    payload: response
  }
}

export function sendBillsFailure(error) {
  return {
    type: SEND_BILLS_FAILURE,
    payload: error
  }
}
