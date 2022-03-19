import {SAVE_ITEMS, ERASE_ALL} from './actionTypes';

const initialState = {
  items: {},
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ITEMS:
      return {...state, items: action.payload};
    case ERASE_ALL:
      return {
        items: {},
      };
    default:
      return state;
  }
};
