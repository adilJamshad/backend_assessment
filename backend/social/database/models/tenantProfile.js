const { Model } = require("objection");

class TenantProfile extends Model {
  static get tableName() {
    return "tenant_profile";
  }
  static get relationMappings() {
    const UserProfile = require("./userProfile");
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: UserProfile,
        join: {
          from: "tenant_profile.id",
          to: "user_profile.tenant_id",
        },
      },
    };
  }
}

module.exports = TenantProfile;
