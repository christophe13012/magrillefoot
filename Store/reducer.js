import {SAVE_ITEMS, SAVE_GRILLES, ERASE_ALL} from './actionTypes';

const initialState = {
  items: {},
  grilles: {},
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ITEMS:
      return {...state, items: action.payload};
    case SAVE_GRILLES:
      return {...state, grilles: action.payload};
    case ERASE_ALL:
      return {
        items: {},
      };
    default:
      return state;
  }
};
