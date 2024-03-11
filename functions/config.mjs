export default async (req, context) => {
	const genres = await import('../data/genres.json').then((mod) => mod.default);
	const people = await import('../data/people.json').then((mod) => mod.default);

	return Response.json({
		genres,
		people
	});
};
