const { db } = require("./common");

const MAX_TRIES = 5;

function getFilmFromDirectors(directorIds, skip = [], tries = 0) {
  const splitIds = directorIds.split(",");
  const directorId = randomDirectorFromParams(directorIds);

  return db.Client.query(
    db.Query.Paginate(
      db.Query.Match(db.Query.Index("films_by_director"), directorId.toString())
    )
  )
    .then((refs) => {
      const randomRef = refs.data[Math.floor(refs.data.length * Math.random())];

      return db.Client.query(db.Query.Get(randomRef));
    })
    .then((ref) => {
      const film = ref.data;

      if (skip.indexOf(film.id.toString()) >= 0) {
        if (tries > MAX_TRIES) {
          const newIds = directorIds.split(",");

          if (newIds.length > 1) {
            newIds.splice(newIds.indexOf(directorId), 1);

            return getFilmFromDirectors(newIds.join(","), skip, 0);
          } else {
            throw new Error("Unable to find film");
          }
        }

        return getFilmFromDirectors(directorIds, skip, tries + 1);
      }

      return film;
    });
}

function randomDirectorFromParams(directors) {
  const split = directors.split(",");

  return split[Math.floor(split.length * Math.random())];
}

function returnError(message, statusCode = 400) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  };
}

exports.handler = async (event, context) => {
  const { directors, skip = "" } = JSON.parse(event.body);

  if (!directors) {
    return returnError("No Directors");
  }

  try {
    const film = await getFilmFromDirectors(directors, skip.split(","));

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
