import store from 'store2';

/**
 * Set session
 * @param {string} key
 * @param {any} value
 */
export const set = (key = '', value = null) => {
  if (!key && !value) return;
  store.session(key, value);
}

/**
 * Get session by key
 * @param {string} key
 */
export const get = (key = '') => store.session(key);

/**
 * Remove session by key
 * @param {string} key 
 */
export const del = (key = '') => store.session.remove(key);

