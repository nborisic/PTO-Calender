import { Map } from 'immutable';

import {
  FETCH_USERS_START,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  SCREEEN_SIZE,
} from 'actions/app';

const initialState = Map({
  breakpoint: null,
  fetchUsersLoading: false,
  fetchUsersError: null,
  fetchUsersData: null,
});

const actionsMap = {
  [FETCH_USERS_START]: (state) => {
    return state.merge(Map({
      fetchUsersLoading: true,
      fetchUsersError: null,
      fetchUsersData: null,
    }));
  },
  [FETCH_USERS_ERROR]: (state, action) => {
    return state.merge(Map({
      fetchUsersLoading: false,
      fetchUsersError: action.error.message,
    }));
  },
  [FETCH_USERS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      fetchUsersLoading: false,
      fetchUsersData: action.data,
    }));
  },
  [SCREEEN_SIZE]: (state, action) => {
    return state.merge(Map({
      breakpoint: action.screenSize,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
