import jsonfile from 'jsonfile';
import { moviedb } from '../api/tmdb.js';
import {
	Genres,
	People,
	addGenreJoin,
	addGenres,
	addMovie,
	addPerson,
	addPersonJoin,
	cleanup,
	getMovie,
	removePeople,
	FullMovies,
	db
} from '../api/db.js';
import * as url from 'url';
import path from 'path';
import fs from 'fs-extra';
import { promiseRunner } from '../api/utils.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const PERSON_IDS = [
	5655, // Wes Anderson
	5953, // Spike Jonze
	3776, // Jean-Luc Godard
	1769, // Sofia Coppola
	4429, // Jim Jarmusch
	240, // Stanley Kubrick
	5026, // Akira Kurosawa
	5602, // David Lynch
	7467, // David Fincher
	1224, // Ethan Coen
	5281, // Spike Lee
	608, // Hayao Miyazaki
	14597, // Gaspar Noé
	564, // Richard Linklater
	4762, // Paul Thomas Anderson
	138, // Quentin Tarantino
	12453, // Wong Kar-wai
	21684, // Bong Joon-ho
	10099, // Park Chan-wook
	2636, // Alfred Hitchcock
	5656, // Noah Baumbach
	45400, // Greta Gerwig
	11090, // Edgar Wright
	291263, // Jordan Peele
	1145520, // Ari Aster
	138781, // Robert Eggers
	11770, // John Carpenter
	5140, // Wes Craven
	42, // Lars von Trier
	6431, // Darren Aronofsky
	6011, // Michael Haneke
	21183, // Nicolas Winding Refn
	45791, // Roy Andersson
	1032, // Martin Scorsese
	8452, // Andrei Tarkovsky
	137427, // Denis Villeneuve
	223, // Alejandro González Iñárritu
	// 39996, // Sidney Lumet
	578, // Ridley Scott
	1776, // Francis Ford Coppola
	3974, // Miloš Forman
	280, // Terry Gilliam
	4385, // Sergio Leone
	4415, // Federico Fellini
	11218, // Alfonso Cuarón
	14392, // Kathryn Bigelow
	5763, // Jacques Tati
	25645, // Hirokazu Kore-eda
	222686, // Mia Hansen-Løve
	71609, // Joachim Trier
	28615, // Eric Rohmer
	1395183, // Chloe Zhao
	122423 // Yorgos Lanthimos
];

const force = process.argv.some((item) => item === '-f');

(async () => {
	console.log('Getting genres');
	const { genres } = await moviedb.genres.get();

	console.log('Adding genres');
	await addGenres(genres);

	const existingIds = (await People().select('id')).map((item) => item.id);

	const removedIds = existingIds.filter((id) => !PERSON_IDS.includes(id));
	const addedIds = force ? PERSON_IDS : PERSON_IDS.filter((id) => !existingIds.includes(id));

	if (removedIds.length) {
		console.log(`Removing ${removedIds.join(', ')}`);
		await removePeople(removedIds);
	}

	console.log('Getting people');
	const people = (
		await promiseRunner(addedIds, async (id) => {
			const person = await moviedb.person.get(id);

			return person;
		})
	).map((person) => {
		return {
			info: {
				id: person.id,
				imdb_id: person.imdb_id,
				birthplace: person.place_of_birth,
				name: person.name,
				birthday: person.birthday,
				deathday: person.deathday
			},
			movies: person.credits.crew.filter((movie) => movie.job === 'Director')
		};
	});

	console.log('Adding People');
	await promiseRunner(people, async (person) => {
		await addPerson(person.info);

		console.log(`Adding ${person.info.name} (${person.movies.length} movies)`);

		await promiseRunner(person.movies, async (movie) => {
			const exists = await getMovie(movie.id);

			if (exists && !force) {
				return;
			}

			const detail = await moviedb.movie.get(movie.id);

			if (detail.status !== 'Released') {
				return;
			}

			try {
				await addMovie({
					id: movie.id,
					title: detail.title,
					original_title: detail.original_title,
					poster: detail.poster_path ?? null,
					backdrop: detail.backdrop_path ?? null,
					overview: detail.overview,
					synopsis: detail.overview,
					runtime: detail.runtime,
					rating: detail.vote_average,
					rt_rating: null,
					release_date: detail.release_date,
					trailer: detail.trailer?.key ?? null
				});

				await Promise.all(movie.genre_ids.map((id) => addGenreJoin(movie.id, id)));
				await addPersonJoin(movie.id, person.info.id);
			} catch (e) {
				console.error(e);
				console.log(`Error with: `, movie);
			}
		});
	});

	const peopleItems = await People().select('id', 'name');
	const genreItems = await Genres().select('id', 'name');

	peopleItems.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});
	genreItems.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});

	await jsonfile.writeFile(path.join(__dirname, '../data/people.json'), peopleItems);
	await jsonfile.writeFile(path.join(__dirname, '../data/genres.json'), genreItems);

	const saveMovies = async () => {
		await fs.ensureDir(path.join(__dirname, `../data/film/`));

		const movies = await FullMovies()
			.select(
				'movie.*',
				db.raw(`GROUP_CONCAT(DISTINCT genre.name) as genre`),
				'person.name as person'
			)
			.groupBy('movie.id');

		return promiseRunner(movies, async (movie) => {
			await jsonfile.writeFile(path.join(__dirname, `../data/film/${movie.id}.json`), movie);
		});
	};

	const saveGenres = async () => {
		await fs.ensureDir(path.join(__dirname, `../data/genre/`));

		const genres = await Genres();

		return promiseRunner(genres, async (genre) => {
			const movies = await FullMovies()
				.select('movie.id')
				.where('genre.id', genre.id)
				.where('movie.runtime', '>', 60)
				.groupBy('movie.id');

			await jsonfile.writeFile(
				path.join(__dirname, `../data/genre/${genre.id}.json`),
				movies.map((item) => item.id)
			);
		});
	};

	const savePeople = async () => {
		await fs.ensureDir(path.join(__dirname, `../data/person/`));

		const people = await People();

		return promiseRunner(people, async (person) => {
			const movies = await FullMovies()
				.select('movie.id')
				.where('person.id', person.id)
				.where('movie.runtime', '>', 60)
				.groupBy('movie.id');

			await jsonfile.writeFile(
				path.join(__dirname, `../data/person/${person.id}.json`),
				movies.map((item) => item.id)
			);
		});
	};

	console.log(`Exporting movies statically`);
	await saveMovies();

	console.log(`Exporting genres statically`);
	await saveGenres();

	console.log(`Exporting people statically`);
	await savePeople();

	await cleanup();
})();
