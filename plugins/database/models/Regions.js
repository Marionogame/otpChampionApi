const { Model } = require("objection");
const { omit } = require("lodash");

class Regions extends Model {
  static get tableName() {
    return "region";
  }

  static get idColumn() {
    return "ids";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["region", "acronym"],
      properties: {
        idRegion: { type: "integer" },
        region: { type: "string", minLength: 1, maxLength: 45 },
        acronym: { type: "string", minLength: 1, maxLength: 10 },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    return omit(json, ["createdDate"]);
  }
}

module.exports = Regions;
