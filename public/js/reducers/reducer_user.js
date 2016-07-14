import {
  SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE,
  GET_USER_FROM_TOKEN, GET_USER_FROM_TOKEN_SUCCESS, GET_USER_FROM_TOKEN_FAILURE,
  SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE,
  LOGOUT_USER
} from '../actions/users';

const INITIAL_STATE = {user: null, status: null, error: null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;

  switch(action.type) {
    case SIGNIN_USER:
      return { ...state, user: null, status: 'signin', error: null, loading: true};
    case SIGNIN_USER_SUCCESS:
      return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, loading: false};
    case SIGNIN_USER_FAILURE:
      error = action.payload.data || {message: action.payload.message};
      return { ...state, user: null, status: 'signin', error: error, loading: false};
    case SIGNUP_USER:
      return { ...state, user: null, status: 'signup', error: null, loading: true};
    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, loading: false};
    case SIGNUP_USER_FAILURE:
      error = action.payload.data || {message: action.payload.message};
      return { ...state, user: null, status: 'signup', error: error, loading: false};
    case GET_USER_FROM_TOKEN:
      return { ...state, user: null, status: 'storage', error: null, loading: true};
    case GET_USER_FROM_TOKEN_SUCCESS:
      return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, loading: false};
    case GET_USER_FROM_TOKEN_FAILURE:
      error = action.payload.data || {message: action.payload.message};
      return { ...state, user: null, status: 'storage', error: error, loading: false};
    case LOGOUT_USER:
      return { ...state, user: null, status: 'logout', error: null, loading: false};
    default:
      return state;
  }
}
