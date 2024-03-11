import { persistValue } from '$lib/utils.js';
import { writable } from 'svelte/store';

const defaultData = {
	menu: false,

	/** @type {string | null} */
	theme: null
};

const data = writable(defaultData);

export const store = {
	...data,

	/**
	 *
	 * @param {keyof defaultData} key
	 * @param {any} value
	 * @returns {Promise<void>}
	 */
	update(key, value) {
		return new Promise((resolve) => {
			data.update((state) => ({
				...state,
				[key]: value
			}));
			resolve();
		});
	},

	/**
	 *
	 * @param {boolean} value
	 * @returns {Promise<void>}
	 */
	setMenu(value) {
		return store.update('menu', value);
	},

	/**
	 *
	 * @param {string | null} value
	 */
	setTheme(value) {
		return store.update('theme', value);
	}
};

store.subscribe((state) => {
	if (state.theme) {
		persistValue('theme', state.theme);
	}
});
