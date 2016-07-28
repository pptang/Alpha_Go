import axios from 'axios';
import { ROOT_URL } from '../config.js'
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export const NEW_EVENT = 'NEW_EVENT';
export const NEW_EVENT_SUCCESS = 'NEW_EVENT_SUCCESS';
export const NEW_EVENT_FAILURE = 'NEW_EVENT_FAILURE';

export const RESET_EVENT_STATE = 'RESET_EVENT_STATE';

export const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID';
export const GET_EVENT_BY_ID_SUCCESS = 'GET_EVENT_BY_ID_SUCCESS';
export const GET_EVENT_BY_ID_FAILURE = 'GET_EVENT_BY_ID_FAILURE';

export const DELETE_EVENT_BY_ID = 'DELETE_EVENT_BY_ID';
export const DELETE_EVENT_BY_ID_SUCCESS = 'DELETE_EVENT_BY_ID_SUCCESS';
export const DELETE_EVENT_BY_ID_FAILURE = 'DELETE_EVENT_BY_ID_FAILURE';
export const RESET_DELETED_EVENT = 'RESET_DELETED_EVENT';

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

export function newEvent(formValues, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: formValues,
    url: `${ROOT_URL}api/v1/events`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: NEW_EVENT,
    payload: request
  };
}

export function newEventSuccess(newPost) {
  return {
    type: NEW_EVENT_SUCCESS,
    payload: newPost
  }
}

export function newEventFailure(error) {
  return {
    type: NEW_EVENT_FAILURE,
    payload: error
  };
}

export function resetEventState() {
  return {
    type: RESET_EVENT_STATE
  };
}

export function getEventById(eventId, tokenFromStorage) {
  console.log("getEventById::" + tokenFromStorage);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}api/v1/getEvent/${eventId}`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: GET_EVENT_BY_ID,
    payload: request
  };
}

export function getEventByIdSuccess(event) {
  return {
    type: GET_EVENT_BY_ID_SUCCESS,
    payload: event
  };
}

export function getEventByIdFailure(error) {
  return {
    type: GET_EVENT_BY_ID_FAILURE,
    payload: error
  };
}

export function deleteEvent(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}api/v1/events/${id}`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: DELETE_EVENT_BY_ID,
    payload: request
  };
}

export function deleteEventSuccess(deletedPost) {
  return {
    type: DELETE_EVENT_BY_ID_SUCCESS,
    payload: deletedPost
  };
}

export function deleteEventFailure(error) {
  return {
    type: DELETE_EVENT_BY_ID_FAILURE,
    payload: error
  };
}

export function resetDeletedEvent() {
  return {
    type: RESET_DELETED_EVENT
  }
};
