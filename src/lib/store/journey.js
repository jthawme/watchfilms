import { persistValue } from '$lib/utils.js';
import { derived, get, writable } from 'svelte/store';

const defaultData = {
	started: false,

	/** @type {number[]} */
	genres: [],
	/** @type {number[]} */
	people: [],
	/** @type {Array<{id: number, title: string, backdrop: string}>} */
	avoid: [],

	/** @type {Array<{id: number, title: string, backdrop: string}>} */
	want: [],

	films: []
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
	 * @param {number[]} genres
	 * @param {number[]} people
	 * @returns {Promise<void>}
	 */
	async begin(genres = [], people = []) {
		return new Promise((resolve) => {
			data.update((state) => ({
				...state,
				genres,
				people,
				started: true,
				films: []
			}));

			if (genres.length) {
				persistValue('genres', JSON.stringify(genres));
			}

			if (people.length) {
				persistValue('people', JSON.stringify(people));
			}

			resolve();
		});
	},

	/**
	 *
	 * @param {object} film
	 */
	storeFilm(film) {
		const current = get(store).films;

		if (current.some((item) => item.id === film.id)) {
			return Promise.resolve();
		}

		return store.update('films', [...current, film]);
	},

	loadAvoid(avoid) {
		store.update('avoid', avoid);
	},

	loadWant(want) {
		store.update('want', want);
	},

	skipFilm(film) {
		return store.update('avoid', [
			...get(store).avoid,
			{
				id: film.id,
				title: film.title,
				backdrop: film.backdrop
			}
		]);
	},

	removeFilm(film) {
		const avoid = [...get(store).avoid];

		avoid.splice(
			avoid.findIndex((item) => item.id === film),
			1
		);

		return store.update('avoid', avoid);
	},

	saveFilm(film) {
		return store.update('want', [
			...get(store).want,
			{
				id: film.id,
				title: film.title,
				backdrop: film.backdrop
			}
		]);
	},

	/**
	 *
	 * @param {number} filmId
	 */
	removeWantFilm(filmId) {
		const want = [...get(store).want];

		want.splice(
			want.findIndex((item) => item.id === filmId),
			1
		);

		return store.update('want', want);
	}
};

// Persist the avoiding values
const avoid = derived([store], ([$store]) => {
	return $store.avoid;
});

let lastAvoid = [];
avoid.subscribe((items) => {
	if (JSON.stringify(lastAvoid) !== JSON.stringify(items)) {
		persistValue('avoid', JSON.stringify(items));
	}

	lastAvoid = items;
});

// Persist the want values
const want = derived([store], ([$store]) => {
	return $store.want;
});

let lastWant = [];
want.subscribe((items) => {
	if (JSON.stringify(lastWant) !== JSON.stringify(items)) {
		persistValue('want', JSON.stringify(items));
	}

	lastWant = items;
});
