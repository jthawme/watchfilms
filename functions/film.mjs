import { getFilm } from '../api/api.js';

/**
 *
 * @param {Request} event
 * @param {*} context
 * @returns
 */
const handler = async (event, { geo }) => {
	const film = await getFilm(parseInt(new URL(event.url).searchParams.get('id')), geo.country.code);

	return Response.json({
		film
	});
};

export default handler;

// export const config = {
// 	path: '/.netlify/functions/film/:id'
// };
