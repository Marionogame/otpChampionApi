const { Model } = require("objection");
const { omit } = require("lodash");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get idColumn() {
    return "userId";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["fullName", "email", "phone", "password"],
      properties: {
        userId: { type: "integer" },
        fullName: { type: "string", minLength: 1, maxLength: 50 },
        nickName: { type: "string", maxLength: 25 },
        email: { type: "string", minLength: 1, maxLength: 50, format: "email" },
        phone: { type: "string", minLength: 1, maxLength: 15 },
        password: { type: "string", minLength: 1, maxLength: 100 },
        expoToken: { type: "string", maxLength: 100 },
        state: { type: "boolean" },
        createdDate: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    return omit(json, ["createdDate"]);
  }
}

module.exports = User;
