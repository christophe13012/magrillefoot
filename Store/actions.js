import {SAVE_ITEMS, ERASE_ALL, SAVE_GRILLES} from './actionTypes';

export const save_items = payload => {
  console.log('payload', payload);
  return {type: SAVE_ITEMS, payload};
};

export const save_grilles = payload => {
  return {type: SAVE_GRILLES, payload};
};

export const erase_all = payload => {
  return {type: ERASE_ALL, payload};
};
