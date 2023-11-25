import { csrfFetch } from './csrf';

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    default:
      return state;
  }
};

export default sessionReducer;
