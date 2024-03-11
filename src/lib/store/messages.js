import { get, writable } from 'svelte/store';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });

/** @type {Array<{id: string, text: string, delay?: number, action?: () => void, type: string}>} */
const defaultData = [];
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
	 * @param {string} text
	 * @param {{ type?: string, delay?: number, action?: () => void}} opts
	 */
	add(text, { type = 'standard', delay, action } = {}) {
		const id = uid.rnd();

		data.update((state) => [
			...state,
			{
				id,
				text,
				type,
				delay,
				action
			}
		]);

		return () => store.remove(id);
	},

	/**
	 *
	 * @param {string} id
	 */
	remove(id) {
		const messages = get(data);

		messages.splice(
			messages.findIndex((item) => item.id === id),
			1
		);

		store.set(messages);
	}
};
