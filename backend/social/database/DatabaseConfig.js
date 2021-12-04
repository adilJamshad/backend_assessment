const knex = require("knex");
const connectionInfo = require("./knexfile");
const { Model } = require("objection");

function initializeDB() {
  const db = knex(connectionInfo);
  Model.knex(db);
}

module.exports = { initializeDB };
