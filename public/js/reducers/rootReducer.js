import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  form: formReducer
});

export default rootReducer;
