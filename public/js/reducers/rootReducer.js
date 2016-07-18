import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  UserReducer,
  formReducer
});

export default rootReducer;
