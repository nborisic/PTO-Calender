import { Map } from 'immutable';

import {
  ADD_FILTER,
  REMOVE_FILTER,
} from 'actions/filter';

const initialState = Map({
  PROJECT: [],
  LOCATION: [],
  DISCIPLINE: [],
  EMPLOYEES: [],
});

const actionsMap = {
  [ADD_FILTER]: (state, action) => {
    const addFilter = [...state.get(action.category), action.value];
    return state.merge(Map({
      [action.category]: addFilter,
    }));
  },
  [REMOVE_FILTER]: (state, action) => {
    const removeFilter = state.get(action.category).concat([]);
    const position = removeFilter.indexOf(action.value);
    removeFilter.splice(position, 1);
    return state.merge(Map({
      [action.category]: removeFilter,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
