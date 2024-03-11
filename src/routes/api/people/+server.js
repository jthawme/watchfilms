import { json } from '@sveltejs/kit';
import people from '$lib/data/people.json';

export async function GET() {
	return json({
		people
	});
}
