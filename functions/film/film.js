const { getFilmByIndex, returnSuccess, returnError } = require("./common");

const MAX_TRIES = 5;

function randomDirectorFromParams(directors) {
  const split = directors.split(",");

  return split[Math.floor(split.length * Math.random())];
}

function getFilmFromDirectors(directorIds, skip = [], tries = 0) {
  const splitIds = directorIds.split(",");
  const directorId = randomDirectorFromParams(directorIds);

  return getFilmByIndex("films_by_director", directorId.toString()).then(
    (ref) => {
      const film = ref.data;

      if (skip.indexOf(film.id.toString()) >= 0) {
        if (tries > MAX_TRIES) {
          if (splitIds.length > 1) {
            splitIds.splice(splitIds.indexOf(directorId), 1);

            return getFilmFromDirectors(splitIds.join(","), skip, 0);
          } else {
            throw new Error("Unable to find film");
          }
        }

        return getFilmFromDirectors(directorIds, skip, tries + 1);
      }

      return film;
    }
  );
}

exports.handler = async (event, context) => {
  const { directors, skip = "" } = JSON.parse(event.body);

  if (!directors) {
    return returnError("No Directors");
  }

  try {
    const film = await getFilmFromDirectors(directors, skip.split(","));

    return returnSuccess(film);
  } catch (e) {
    return returnError(e.message);
  }
};
