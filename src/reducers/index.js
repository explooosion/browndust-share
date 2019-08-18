import { combineReducers } from 'redux';
import settings from './settings';
import characters from './characters';
import dataset from './dataset';

export default combineReducers({
  dataset,
  characters,
  settings,
})
