import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';
import EventReducer from './reducer_event';
const rootReducer = combineReducers({
  UserReducer: UserReducer,
  form: formReducer,
  EventReducer: EventReducer
});

export default rootReducer;
