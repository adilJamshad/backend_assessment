const { knexSnakeCaseMappers } = require("objection");
module.exports = {
  client: "pg",
  useNullAsDefault: true,
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seed: {
    directory: __dirname + "./database/seeds",
  },
  ...knexSnakeCaseMappers,
};
