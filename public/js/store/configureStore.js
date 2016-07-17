import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer.js';
import promise from 'redux-promise';

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(promise));
};
