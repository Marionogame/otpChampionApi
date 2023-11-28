const { Model } = require("objection");

class Roles extends Model {
  static get tableName() {
    return "role";
  }

  static get idColumn() {
    return "idRole";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        idRole: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 15 },
      },
    };
  }
}

module.exports = Roles;
