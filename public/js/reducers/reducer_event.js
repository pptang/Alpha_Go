import {
  GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE,
  NEW_EVENT, NEW_EVENT_SUCCESS, NEW_EVENT_FAILURE,
  RESET_EVENT_STATE, GET_EVENT_BY_ID, GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILURE
} from '../actions/events';

var moment = require('moment');

const INITIAL_STATE = {
  eventList: { events: [], error: null, loading: false},
  newEvent: { event: {date: moment()}, error: null, loading: false},
  activeEvent: { event: null, error: null, loading: false}
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case GET_EVENTS:
      return { ...state, eventList: { events: [], error: null, loading: true } };
    case GET_EVENTS_SUCCESS:
      return { ...state, eventList: { events: action.payload.data.events, error: null, loading: false } };
    case GET_EVENTS_FAILURE:
      error = action.payload.data.error || {message: action.payload.message};
      return { ...state, eventList: { events: [], error: error, loading: false } };
    case NEW_EVENT:
      return { ...state, newEvent: {...state.newEvent, loading: true } };
    case NEW_EVENT_SUCCESS:
      return { ...state, newEvent: {event: action.payload.data.event, error: null, loading: false}};
    case NEW_EVENT_FAILURE:
      error = action.payload.data.error || {message: action.payload.message};
      return { ...state, newEvent: {event: null, error: error, loading: false}};
    case RESET_EVENT_STATE:
      return { ...state, newEvent: {event: null, error: null, loading: false}};
    case GET_EVENT_BY_ID:
      return { ...state, activeEvent: {...state.activeEvent, loading: true}};
    case GET_EVENT_BY_ID_SUCCESS:
      return { ...state, activeEvent: {event: action.payload.data.event, error: null, loading: false}};
    case GET_EVENT_BY_ID_FAILURE:
      error = action.payload.data.error || {message: action.payload.message};
      return { ...state, activeEvent: {event: null, error: error, loading: false}};
    default:
      return state;
  }
}
