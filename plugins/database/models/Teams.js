const { Model } = require("objection");

class Teams extends Model {
  static get tableName() {
    return "team";
  }

  static get idColumn() {
    return "idTeam";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "url", "idRegion", "acronym"],
      properties: {
        idTeam: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 45 },
        url: { type: "string", minLength: 1, maxLength: 255 },
        idRegion: { type: ["integer", "null"] },
        acronym: { type: "string", minLength: 1, maxLength: 45 },
      },
    };
  }
  static get relationMappings() {
    const Regions = require("./Regions");
    return {
      region: {
        relation: Model.BelongsToOneRelation,
        modelClass: Regions,
        join: {
          from: "team.idRegion",
          to: "region.idRegion",
        },
      },
    };
  }
}

module.exports = Teams;
