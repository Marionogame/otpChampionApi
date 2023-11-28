const { Model } = require("objection");

class Teamstats extends Model {
  static get tableName() {
    return "teamstat";
  }

  static get idColumn() {
    return "idTeamstat";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["idTeam", "winner", "kdaKill", "kdaDeath", "kdaAssist", "gold", "tower", "idGame", "blue"],
      properties: {
        idTeamstat: { type: "integer" },
        idTeam: { type: ["integer", "null"] },
        winner: { type: "boolean" },
        kdaKill: { type: "integer" },
        kdaDeath: { type: "integer" },
        kdaAssist: { type: "integer" },
        gold: { type: "integer" },
        tower: { type: "integer" },
        idGame: { type: "integer" },
        blue: { type: "boolean" },
      },
    };
  }
  static get relationMappings() {
    const Teams = require("./Teams");
    const Championstats = require("./Championstats");

    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teams,
        join: {
          from: "teamstat.idTeam",
          to: "team.idTeam",
        },
      },
      championstat: {
        relation: Model.HasManyRelation,
        modelClass: Championstats,
        join: {
          from: "championstat.idTeamStat",
          to: "teamstat.idTeamStat",
        },
      },
    };
  }
}

module.exports = Teamstats;
