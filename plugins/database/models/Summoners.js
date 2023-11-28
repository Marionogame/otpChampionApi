const { Model } = require("objection");

class Summoners extends Model {
  static get tableName() {
    return "summoner";
  }

  static get idColumn() {
    return "idSummoner";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        idSummoner: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 45 },
      },
    };
  }
}

module.exports = Summoners;
