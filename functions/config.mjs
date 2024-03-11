export default async (req) => {
	if (req.method !== 'GET') {
		return Response.json(
			{
				message: `${req.method} not supported`
			},
			{
				status: 400
			}
		);
	}

	const genres = await import('../data/genres.json').then((mod) => mod.default);
	const people = await import('../data/people.json').then((mod) => mod.default);

	return Response.json({
		genres,
		people
	});
};
