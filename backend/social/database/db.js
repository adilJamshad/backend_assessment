const knex = require("knex");
const connec = require("./knexfile");

const db = knex(connec);

module.exports = db;
