import { combineReducers } from 'redux';
import app from 'reducers/app';
import filter from 'reducers/filter';

export default combineReducers({
  app,
  filter,
});
