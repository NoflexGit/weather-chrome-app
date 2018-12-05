/**
 * Get item from local storage.
 * @function getItem
 * @param {string} key - Retrieve the value of this key.
 * @return {any} Stored value or undefined if the key doesn't exist.
 */
export const getItem = key => {
	const item = window.localStorage.getItem(key);

	if (item === null) {
		console.warn('LocalStorage: ' + key + ' not found.');
		return undefined;
	} else {
		console.info('LocalStorage: Loaded ' + key + '.');
		return JSON.parse(item);
	}
};

/**
 * Remove item from local storage.
 * @function removeItemItem
 * @param {string} key - Retrieve the value of this key.
 */
export const removeItem = key => {
	window.localStorage.removeItem(key);
};

/**
 * Set item in local storage.
 * @function setItem
 * @param {string} key - Assign value to this key.
 * @param {any} value - Value to be stored.
 */
export const setItem = (key, value) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};
