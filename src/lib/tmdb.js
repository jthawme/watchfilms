import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { timer } from './utils.js';

dotenv.config();

export const moviedb = {
	/**
	 *
	 * @param {string} route
	 * @param {import('node-fetch').RequestInit | undefined} [opts]
	 * @param {boolean} retry
	 *
	 * @returns {Promise<any>}
	 */
	fetch(route, opts = {}, retry = true) {
		return fetch(`https://api.themoviedb.org/3${route}`, {
			method: 'GET',
			...opts,
			headers: {
				...(opts.headers ?? {}),
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_KEY}`
			}
		}).then((resp) => {
			if (resp.status === 429) {
				console.error('Rate limit');

				if (retry) {
					return timer(1000).then(() => moviedb.fetch(route, opts));
				}

				throw new Error('Rate Limit');
			}

			return resp.json();
		});
	},

	person: {
		/**
		 *
		 * @param {number} id
		 */
		async get(id) {
			const details = await moviedb.fetch(`/person/${id}`);
			const credits = await moviedb.fetch(`/person/${id}/movie_credits`);

			return {
				...details,
				credits
			};
		}
	},

	trailers: {
		/**
		 *
		 * @param {number} id
		 */
		get(id) {
			try {
				return moviedb.fetch(`/movie/${id}/videos`);
			} catch (e) {
				return {
					id,
					results: []
				};
			}
		}
	},

	movie: {
		/**
		 *
		 * @param {number} id
		 */
		async get(id) {
			const film = await moviedb.fetch(`/movie/${id}`);

			if (!film) {
				return null;
			}

			const trailers = await moviedb.trailers.get(id);

			return {
				...film,
				trailer:
					(trailers?.results || []).find(
						(item) => item.iso_639_1 === 'en' && item.site === 'YouTube' && item.type === 'Trailer'
					) ?? null
			};
		},

		/**
		 *
		 * @param {number} id
		 */
		providers(id) {
			return moviedb.fetch(`/movie/${id}/watch/providers`);
		}
	},

	genres: {
		get() {
			return moviedb.fetch('/genre/movie/list');
		}
	}
};
