const { Model } = require("objection");

class Items extends Model {
  static get tableName() {
    return "item";
  }

  static get idColumn() {
    return "idItem";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "url"],
      properties: {
        idItem: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 45 },
        url: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Items;
