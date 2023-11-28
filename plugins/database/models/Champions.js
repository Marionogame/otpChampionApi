const { Model } = require("objection");

class Champions extends Model {
  static get tableName() {
    return "champion";
  }

  static get idColumn() {
    return "idChampion";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "url", "idPosition", "idRole"],
      properties: {
        idChampion: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 45 },
        url: { type: "string", minLength: 1, maxLength: 255 },
        idPosition: { type: ["integer", "null"] },
        idRole: { type: ["integer", "null"] },
      },
    };
  }
  static get relationMappings() {
    const Positions = require("./Positions");
    const Roles = require("./Roles");

    return {
      position: {
        relation: Model.BelongsToOneRelation,
        modelClass: Positions,
        join: {
          from: "champion.idPosition",
          to: "position.idPosition",
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Roles,
        join: {
          from: "champion.idRole",
          to: "role.idRole",
        },
      },
    };
  }
}

module.exports = Champions;
