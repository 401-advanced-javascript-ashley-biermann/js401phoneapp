
// STORE
// if this gets NAMED, like in a object or something, you'd have to dig down into to... looking to index.js... selectedPhoto is the first level, then null. But if this said { selectedPhoto: null }, you'd have to go down into selectedPhoto.selectedPhoto. 
const initialState = null;

// REDUCERS
// with state = initialState... it is read from index.js 'selectedPhoto', and then the value of initialState, null. So, selectedPhoto = null.
export default reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE':
      return {...state, selectedPhoto: payload };
    default:
      return state;
  }
}

// ACTIONS
export const pickPhoto = (photo) => {
  return {
    type: 'UPDATE',
    payload: photo, //TODO: This might need some tweaking. See what is really coming through
  }
}