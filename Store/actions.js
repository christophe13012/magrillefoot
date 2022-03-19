import {SAVE_ITEMS, ERASE_ALL} from './actionTypes';

export const save_items = payload => {
  return {type: SAVE_ITEMS, payload};
};

export const erase_all = payload => {
  return {type: ERASE_ALL, payload};
};
