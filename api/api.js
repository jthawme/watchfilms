import { moviedb } from './tmdb.js';

/**
 *
 * @param {number} id
 * @returns {Promise<any>}
 */
export async function getProviders(id) {
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
 * @param {number[]} genres
 * @param {number[]} people
 * @param {number[]} avoid
 * @returns {Promise<any>}
 */
export const getRandom = async (genres, people, avoid = []) => {
	const paths = [];

	if (genres && genres.length) {
		paths.push(
			...genres.map((genreId) => import(`../data/genre/${genreId}.json`).then((mod) => mod.default))
		);
	}

	if (people && people.length) {
		paths.push(
			...people.map((personId) =>
				import(`../data/person/${personId}.json`).then((mod) => mod.default)
			)
		);
	}

	const films = (await Promise.all(paths)).flat().filter((id) => !avoid.includes(id));

	return {
		count: films.length,
		id: films.length ? films[Math.floor(Math.random() * films.length)] : null
	};
};

/**
 *
 * @param {number} id
 * @param {string} [country]
 * @returns {Promise<any>}
 */
export const getFilm = async (id, country = 'GB') => {
	const film = await import(`../data/film/${id}.json`).then((mod) => mod.default);

	const providers = await (film ? getProviders(film.id) : Promise.resolve(null));

	return film
		? {
				...film,
				providers: providers ? providers[country ?? 'GB'] : null
			}
		: null;
};
