import axios from 'axios';
import { ROOT_URL } from '../config.js'
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export function getEvents(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}api/v1/getAllEvents`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: GET_EVENTS,
    payload: request
  };
}

export function getEventsSuccess(events) {
  return {
    type: GET_EVENTS_SUCCESS,
    payload: events
  };
}

export function getEventsFailure(error) {
  return {
    type: GET_EVENTS_FAILURE,
    payload: error
  };
}
