import { getFilm } from '../api/api.js';

/**
 *
 * @param {Request} event
 * @param {*} context
 * @returns
 */
const handler = async (event, { geo }) => {
	if (event.method !== 'GET') {
		return Response.json(
			{
				message: `${event.method} not supported`
			},
			{
				status: 400
			}
		);
	}

	console.log('Oi sunshine', geo.country.code);

	const film = await getFilm(
		parseInt(new URL(event.url).searchParams.get('id')),
		geo.country.code,
		geo
	);

	return Response.json({
		film
	});
};

export default handler;

// export const config = {
// 	path: '/.netlify/functions/film/:id'
// };
