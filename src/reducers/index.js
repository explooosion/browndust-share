import { combineReducers } from 'redux';

const reducers = [
  'dataset',
  'characters',
  'charactersGlobal',
  'settings',
];

export default combineReducers(
  reducers.reduce((prev, currnet) => ({
    ...prev,
    [currnet]: require(`./${currnet}`).default,
  }), {})
)
