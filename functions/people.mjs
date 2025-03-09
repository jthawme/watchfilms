import { getPerson, getRandom } from '../api/api.js';

/**
 *
 * @param {Request} event
 * @param {*} context
 * @returns
 */
const handler = async (event) => {
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

	const people = await import(`../data/people.json`).then((mod) => mod.default);

	return Response.json({
		people
	});
};

export default handler;
