import { createStore, combineReducers } from 'redux';

import selectedPhoto from './photos.js';

// THIS is the place where you name the sections of state... so state will end up with selectedPhoto.whateverelse gets named in photos.js
let reducers = combineReducers({ selectedPhoto });

let store = () => {
  return createStore(reducers);
}

export default store();
