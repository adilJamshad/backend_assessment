exports.up = function (knex) {
  return knex.schema.createTable("tenant_profile", (table) => {
    table.increments("id");
    table.string("tenant_name");
    table.json("address");
    table.string("city");
    table.string("state");
    table.string("country");
    table.string("zip_code");
    table.string("phone");
    table.string("web_url");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tenant_profile");
};
