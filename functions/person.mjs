import { getPerson, getRandom } from '../api/api.js';

/**
 *
 * @param {Request} event
 * @param {*} context
 * @returns
 */
const handler = async (event) => {
	if (event.method !== 'POST') {
		return Response.json(
			{
				message: `${event.method} not supported`
			},
			{
				status: 400
			}
		);
	}

	const { id } = await new Response(event.body).json();

	const movieIds = await getPerson(id);
	const films = await Promise.all(
		movieIds.map((movieId) => import(`../data/film/${movieId}.json`).then((mod) => mod.default))
	);

	return Response.json({
		films
	});
};

export default handler;
