import { createStore, combineReducers } from 'redux';

import photos from './photos.js';

let reducers = combineReducers({ photos });

let store = () => {
  return createStore(reducers);
}

export default store();
