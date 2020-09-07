const {
  returnError,
  returnSuccess,
  getFilmByIndex,
} = require("../film/common");

const MAX_TRIES = 5;

function randomGenreFromParams(genres) {
  const split = genres.split(",");

  return split[Math.floor(split.length * Math.random())];
}

function getFilmFromGenres(genres, skip = [], tries = 0) {
  const splitGenres = genres.split(",");
  const genre = randomGenreFromParams(genres);

  return getFilmByIndex("films_by_genre", genre).then((ref) => {
    const film = ref.data;

    if (skip.indexOf(film.id.toString()) >= 0) {
      if (tries > MAX_TRIES) {
        if (splitGenres.length > 1) {
          splitGenres.splice(splitGenres.indexOf(genre), 1);

          return getFilmFromGenres(splitGenres.join(","), skip, 0);
        } else {
          throw new Error("Unable to find film");
        }
      }

      return getFilmFromGenres(genres, skip, tries + 1);
    }

    return film;
  });
}

exports.handler = async (event, context) => {
  const { genres, skip = "" } = JSON.parse(event.body);

  if (!genres) {
    return returnError("No Genres");
  }

  try {
    const film = await getFilmFromGenres(genres, skip.split(","));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    };
  } catch (e) {
    return returnError(e.message);
  }
};
