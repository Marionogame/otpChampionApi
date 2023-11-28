const { Model } = require("objection");

class Positions extends Model {
  static get tableName() {
    return "position";
  }

  static get idColumn() {
    return "idPosition";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        idPosition: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 10 },
      },
    };
  }
}

module.exports = Positions;
