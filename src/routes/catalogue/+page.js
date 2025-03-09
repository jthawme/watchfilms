import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
	const { people } = await fetch(`/.netlify/functions/people`).then((resp) => resp.json());

	return { people };
}

export const ssr = false;
