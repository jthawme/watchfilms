import { FullMovies, db } from './db.js';
import { moviedb } from './tmdb.js';

/**
 *
 * @param {number} id
 * @returns {Promise<any>}
 */
async function getProviders(id) {
	try {
		return moviedb.movie.providers(id).then((data) => data.results);
	} catch (e) {
		return [];
	}
}

/**
 *
 * @param {typeof fetch} fetch
 * @param {string} ip
 * @returns {Promise<string | null>}
 */
async function getCountry(fetch, ip) {
	try {
		const { country } = fetch(`https://api.country.is/${ip}`).then((resp) => resp.json());

		return country;
	} catch {
		return null;
	}
}

/**
 *
 * @param {typeof fetch} fetch
 * @param {number[]} genres
 * @param {number[]} people
 * @param {number[]} avoid
 * @param {boolean} [shorts]
 * @param {string} [ip]
 * @returns {Promise<any>}
 */
export const getRandom = async (fetch, genres, people, avoid, shorts = true) => {
	const builder = FullMovies();

	if (genres && genres.length) {
		builder.whereIn('genre.id', genres);
	}

	if (people && people.length) {
		builder.whereIn('person.id', people);
	}

	if (avoid && avoid.length) {
		builder.whereNotIn('movie.id', avoid);
	}

	if (!shorts) {
		builder.where('runtime', '>', 60);
	}

	const count = await builder.clone().count('movie.id AS total').first();

	const film = await builder
		.select('movie.id as id')
		.orderByRaw('RANDOM()')
		.groupBy('movie.id')
		.first()
		.then((data) => data);

	return {
		count: count?.total ?? 0,
		id: film?.id
	};
};

/**
 *
 * @param {number} id
 * @param {string} [country]
 * @returns {Promise<any>}
 */
export const getFilm = async (id, country = 'GB') => {
	const builder = FullMovies()
		.select('movie.*', db.raw(`GROUP_CONCAT(genre.name) as genre`), 'person.name as person')
		.where('movie.id', id)
		.groupBy('movie.id')
		.first();

	const film = await builder.then((data) => data);

	const providers = await (film ? getProviders(film.id) : Promise.resolve(null));

	return film
		? {
				...film,
				providers: providers ? providers[country ?? 'GB'] : null
			}
		: null;
};
