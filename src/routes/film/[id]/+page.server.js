import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
	const { film } = await fetch(`/api/film/${params.id}`).then((resp) => resp.json());

	if (!film) {
		redirect(301, '/');
	}

	return film;
}
