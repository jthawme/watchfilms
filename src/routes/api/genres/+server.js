import { json } from '@sveltejs/kit';
import genres from '$lib/data/genres.json';

export async function GET() {
	return json({
		genres
	});
}
