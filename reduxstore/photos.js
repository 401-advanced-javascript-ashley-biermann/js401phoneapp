
// STORE
const initialState = {
  selectedPhoto: null,
}

// REDUCERS
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