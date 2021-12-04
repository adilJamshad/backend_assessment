const { Model } = require("objection");
const TenantProfile = require("./tenantProfile");

class UserProfile extends Model {
  static get tableName() {
    return "user_profile";
  }

  static get relationMappings() {
    return {
      tenant: {
        relation: Model.BelongsToOneRelation,
        modelClass: TenantProfile,
        join: {
          from: "user_profile.tenant_id",
          to: "tenant_profile.id",
        },
      },
    };
  }
}

module.exports = UserProfile;
