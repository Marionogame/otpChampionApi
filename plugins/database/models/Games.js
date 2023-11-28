const { Model } = require("objection");

class Games extends Model {
  static get tableName() {
    return "game";
  }

  static get idColumn() {
    return "idGame";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["kdaKill", "kdaDeath", "kdaAssist", "idRegion", "date", "tournament", "phase", "patch", "link"],
      properties: {
        idGame: { type: "integer" },
        kdaKill: { type: "integer" },
        kdaDeath: { type: "integer" },
        kdaAssist: { type: "integer" },
        idRegion: { type: ["integer", "null"] },
        date: { type: "string" },
        tournament: { type: "string", minLength: 1, maxLength: 85 },
        phase: { type: "string", minLength: 1, maxLength: 85 },
        patch: { type: "string", minLength: 1, maxLength: 45 },
        link: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
  static get relationMappings() {
    const Regions = require("./Regions");
    const Teamstats = require("./Teamstats");

    return {
      region: {
        relation: Model.BelongsToOneRelation,
        modelClass: Regions,
        join: {
          from: "game.idRegion",
          to: "region.idRegion",
        },
      },
      teamstat: {
        relation: Model.HasManyRelation,
        modelClass: Teamstats,
        join: {
          from: "teamstat.idGame",
          to: "game.idGame",
        },
      },
    };
  }
}

module.exports = Games;
