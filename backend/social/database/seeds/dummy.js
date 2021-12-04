const { json } = require("express");
const faker = require("faker");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE "user_profile" CASCADE');
  await knex.raw('TRUNCATE TABLE "tenant_profile" CASCADE');

  for (let i = 0; i < 10; i++) {
    const { id } = await knex("tenant_profile").insert({
      tenant_name: faker.company.companyName(),
      address: JSON.stringify({ add: faker.address.streetAddress() }),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zip_code: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
      web_url: faker.internet.domainName(),
    });
    await knex("user_profile").insert({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      department: faker.lorem.word(),
      designation: faker.lorem.word(),
      tenant_id: id,
      image_url: faker.random.image(),
      city: faker.address.city(),
      country: faker.address.country(),
      bio: faker.lorem.sentence(),
      social_links: JSON.stringify({ facebook: "https://facebook.com/" }),
      employee_id: faker.datatype.number(),
    });
  }
};
