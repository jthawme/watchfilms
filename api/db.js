import knex from 'knex';
import * as url from 'url';
import path from 'path';
import { promiseRunner } from './utils.js';

const dir =
	typeof __dirname !== 'undefined' ? __dirname : url.fileURLToPath(new URL('.', import.meta.url));

export const db = knex({
	client: 'sqlite3',
	connection: {
		filename: path.join(dir, '../data', 'main.sqlite')
	},
	useNullAsDefault: true
});

const TABLE = {
	GENRE: 'genre',
	PERSON: 'person',
	MOVIE: 'movie',
	MOVIE_GENRE: 'movie_genre',
	MOVIE_PERSON: 'movie_person'
};

export const Genres = () => db(TABLE.GENRE);
export const People = () => db(TABLE.PERSON);
export const Movies = () => db(TABLE.MOVIE);
export const FullMovies = () =>
	db(TABLE.MOVIE)
		.leftJoin(TABLE.MOVIE_GENRE, `${TABLE.MOVIE}.id`, '=', `${TABLE.MOVIE_GENRE}.movie_id`)
		.leftJoin(TABLE.GENRE, `${TABLE.GENRE}.id`, '=', `${TABLE.MOVIE_GENRE}.genre_id`)
		.leftJoin(TABLE.MOVIE_PERSON, `${TABLE.MOVIE}.id`, '=', `${TABLE.MOVIE_PERSON}.movie_id`)
		.leftJoin(TABLE.PERSON, `${TABLE.PERSON}.id`, '=', `${TABLE.MOVIE_PERSON}.person_id`);

export const getGenres = () => {
	return Genres().select('*');
};

/**
 *
 * @param {Array<{id: number, name: string}>} genres
 */
export const addGenres = (genres) => {
	// const rows = await getGenres();
	return Genres().insert(genres).onConflict('id').merge();
};

export const addPerson = (data) => {
	return People().insert(data).returning('*').onConflict('id').merge();
};

export const getMovie = (id) => {
	return Movies().where('id', id).first();
};

/**
 *
 * @param {{ id: number, title: string, original_title?: string, poster: string, backdrop: string, overview: string, synopsis: string, runtime: number, rating: number, rt_rating?: number, release_date: string, trailer: string | null }} data
 */
export const addMovie = (data) => {
	return Movies().insert(data).returning('*').onConflict('id').merge();
};

/**
 *
 * @param {number} movie_id
 * @param {number} person_id
 * @returns {Promise<number>}
 */
export const addPersonJoin = async (movie_id, person_id) => {
	const exists = await db(TABLE.MOVIE_PERSON).where({ movie_id, person_id }).first();

	if (exists) {
		return exists.id;
	}

	return db(TABLE.MOVIE_PERSON)
		.insert({
			movie_id,
			person_id
		})
		.returning('id');
};

/**
 *
 * @param {number} movie_id
 * @param {number} genre_id
 * @returns {Promise<number>}
 */
export const addGenreJoin = async (movie_id, genre_id) => {
	const exists = await db(TABLE.MOVIE_GENRE).where({ movie_id, genre_id }).first();

	if (exists) {
		return exists.id;
	}

	return db(TABLE.MOVIE_GENRE)
		.insert({
			movie_id,
			genre_id
		})
		.returning('id');
};

/**
 *
 * @param {number[]} ids
 */
export const removePeople = (ids) => {
	return promiseRunner(ids, async (id) => {
		const movieIds = (await db(TABLE.MOVIE_PERSON).select('movie_id').where('person_id', id)).map(
			(item) => item.movie_id
		);

		await db(TABLE.MOVIE_PERSON).where('person_id', id).delete();
		await db(TABLE.MOVIE_GENRE).whereIn('movie_id', movieIds).delete();
		await Movies().whereIn('id', movieIds).delete();
		await People().where('id', id).delete();
	});
};

export const cleanup = () => {
	return db.destroy();
};
