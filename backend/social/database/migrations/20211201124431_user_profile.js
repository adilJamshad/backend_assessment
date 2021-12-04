exports.up = function (knex) {
  return knex.schema.createTable("user_profile", (table) => {
    table.increments("id");
    table.string("first_name");
    table.string("last_name");
    table.string("department");
    table.string("designation");
    table.integer("tenant_id").references("id").inTable("tenant_profile");
    table.string("image_url");
    table.string("city");
    table.string("country");
    table.string("bio");
    table.json("social_links");
    table.integer("employee_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_profile");
};
