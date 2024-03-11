import { validateType } from '$lib/utils.js';

/** @type {import('../$types').PageLoad} */
export async function load({ url, fetch }) {
	const { people, genres } = await fetch('/.netlify/functions/config').then((resp) => resp.json());

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
