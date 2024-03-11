import { getFilm } from '../../../../api/api.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params, getClientAddress }) {
	const film = await getFilm(fetch, parseInt(params.id), getClientAddress());

	if (!film) {
		redirect(301, '/');
	}

	return film;
}
