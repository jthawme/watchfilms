import { getRandom } from '../api/api.js';

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

	const { genres = [], people = [], avoid = [] } = await new Response(event.body).json();

	const film = await getRandom(genres, people, avoid, false);

	return Response.json({
		film
	});
};

export default handler;
