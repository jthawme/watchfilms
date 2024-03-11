import { getFilm } from '../api/api.js';

/**
 *
 * @param {Request} event
 * @param {*} context
 * @returns
 */
const handler = async (event, { params, geo }) => {
	const film = await getFilm(parseInt(params.id), geo.country.code);

	return Response.json({
		film
	});
};

export default handler;

export const config = {
	path: '/api/film/:id'
};
