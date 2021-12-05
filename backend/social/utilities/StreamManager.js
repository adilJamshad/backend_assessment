const UserProfile = require("../database/models/userProfile");
const TenantProfile = require("../database/models/tenantProfile");

const processMessage = async (kafkaMessage) => {
  //Start working here
  const { event_name, properties } = kafkaMessage;
  console.log(event_name, properties);
  try {
    if (event_name === "tenant_created") {
      const { address, ...data } = properties;
      const tenant = await TenantProfile.query().insert({
        ...data,
        address: JSON.stringify(address),
      });
    }
    if (event_name === "user_created") {
      const { social_links, ...data } = properties;
      const { tenant_id } = data;
      const tenant = await TenantProfile.query().findById(tenant_id);
      if (!tenant) return; // if tenant does not exists
      const user = await UserProfile.query().insert({
        ...data,
        social_links: JSON.stringify(social_links),
      });
    }
    console.log("event: ", event_name);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { processMessage };
