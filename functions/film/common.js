const faunadb = require("faunadb");

const Client = new faunadb.Client({ secret: process.env.FAUNA_DB });
const Query = faunadb.query;

module.exports = {
  db: { Client, Query },
};
