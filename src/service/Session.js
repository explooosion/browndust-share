import store from 'store2';

/**
 * Set session
 * @param {string} key
 * @param {any} value
 */
const set = (key = '', value = null) => {
  if (!key && !value) return;
  store.session(key, value);
}

/**
 * Get session
 * @param {string} key
 */
const get = (key = '') => store.session(key);

export default {
  set,
  get,
}
