const axios = require("axios");
const { DIRECTORS } = require("./common");

const MINIMUM_RUNTIME = 60;

const queryBuilder = (route, data = {}) => {
  return axios
    .get(`https://api.themoviedb.org/3${route}`, {
      params: {
        ...data,
        api_key: process.env.MOVIEDB_API,
      },
    })
    .then((result) => result.data);
};

const getMovie = (movieId) => {
  return queryBuilder(`/movie/${movieId}`);
};

const getDirectedMovies = (directorId) => {
  return queryBuilder(`/person/${directorId}/credits`)
    .then((results) => {
      return results.crew.filter((i) => i.department === "Directing");
    })
    .then((movies) => {
      return Promise.all(movies.map((m) => getMovie(m.id)));
    })
    .then((works) => works.filter((w) => w.runtime > MINIMUM_RUNTIME));
};

exports.handler = async (event, context) => {
  try {
    const movies = await getDirectedMovies(DIRECTORS.WES_ANDERSON);

    return {
      statusCode: 200,
      body: JSON.stringify({
        movie: movies[Math.floor(movies.length * Math.random())],
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
