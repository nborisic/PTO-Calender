export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';


export function addFilter(category, value) {
  return {
    type: ADD_FILTER,
    category,
    value,
  };
}


export function removeFilter(category, value) {
  return {
    type: REMOVE_FILTER,
    category,
    value,
  };
}
