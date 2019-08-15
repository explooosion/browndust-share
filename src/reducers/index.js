import { combineReducers } from 'redux';
import settings from './settings';
import database from './database';

export default combineReducers({
  settings,
  database,
})
