const faunadb = require("faunadb");

const Client = new faunadb.Client({ secret: process.env.FAUNA_DB });
const Query = faunadb.query;

function getFilmByIndex(index, value) {
  return Client.query(
    Query.Paginate(Query.Match(Query.Index(index), value))
  ).then((refs) => {
    const randomRef = refs.data[Math.floor(refs.data.length * Math.random())];

    return Client.query(Query.Get(randomRef));
  });
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

function returnSuccess(data) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

module.exports = {
  db: { Client, Query },
  getFilmByIndex,
  returnError,
  returnSuccess,
};
