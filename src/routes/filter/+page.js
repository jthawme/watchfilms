import { TYPE } from '$lib/constants.js';
import genres from '$lib/data/genres.json';
import people from '$lib/data/people.json';
import { validateType } from '$lib/utils.js';

/** @type {import('../$types').PageLoad} */
export async function load({ url }) {
	return {
		type: validateType(url.searchParams.get('type')),
		people: people.map((item) => ({
			id: item.id,
			text: item.name
		})),
		genres: genres.map((item) => ({
			id: item.id,
			text: item.name
		}))
	};
}
