import { getRandom } from '../api/api.js';

/**
 *
 * @param {Request} event
 * @param {*} context
 * @returns
 */
const handler = async (event) => {
	const { genres = [], people = [], avoid = [] } = await new Response(event.body).json();

	const film = await getRandom(fetch, genres, people, avoid, false);

	return Response.json({
		film
	});
};

export default handler;
