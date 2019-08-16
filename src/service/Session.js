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
 * Get session by key
 * @param {string} key
 */
const get = (key = '') => store.session(key);

/**
 * Remove session by key
 * @param {string} key 
 */
const del = (key = '') => store.session.remove(key);

export {
  set,
  get,
  del,
}
