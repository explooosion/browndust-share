import Cookies from "js-cookie";

/**
 * Set cookie
 * @param {string} key
 * @param {any} value
 */
export const set = (key = "", value = null) => {
    if (!key && !value) return;
    Cookies.set(key, value, { expires: 365 });
};

/**
 * Get cookie by key
 * @param {string} key
 */
export const get = (key = "") => Cookies.get(key);

/**
 * Remove cookie by key
 * @param {string} key
 */
export const del = (key = "") => Cookies.remove(key);
