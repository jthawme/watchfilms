import { json } from '@sveltejs/kit';
import people from '$lib/data/people.json';
import { getRandom } from '$lib/api.js';

export async function POST({ fetch, request, getClientAddress }) {
	const { genres = [], people = [], avoid = [] } = await request.json();

	const film = await getRandom(fetch, genres, people, avoid, false, getClientAddress());

	return json({
		film
	});
}
