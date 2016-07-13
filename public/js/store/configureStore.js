import { createStore } from 'redux';
// import rootReducer from '../reducers/rootReducer';
import UserReducer from '../reducers/reducer_user';
export default function configureStore() {
  return createStore(UserReducer);
};
