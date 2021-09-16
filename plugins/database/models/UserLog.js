const { Model } = require("objection");

class UserLog extends Model {
  static get tableName() {
    return "userlog";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "ipAddress"],
      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        loginDate: { type: "string" },
        logoutDate: { type: "string" },
        ipAddress: { type: "string", format: "ipv4" },
      },
    };
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "userlog.userId",
          to: "user.userId",
        },
      },
    };
  }
}

module.exports = UserLog;
