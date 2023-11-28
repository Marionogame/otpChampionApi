const { Model } = require("objection");

class Championstats extends Model {
  static get tableName() {
    return "championstat";
  }

  static get idColumn() {
    return "idChampionStat";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["idChampion", "idSummoner", "kdaKill", "kdaDeath", "kdaAssist", "gold", "farm", "idPosition", "idTeamStat"],
      properties: {
        idChampionStat: { type: "integer" },
        idChampion: { type: "integer" },
        idSummoner: { type: "integer" },
        kdaKill: { type: "integer" },
        kdaDeath: { type: "integer" },
        kdaAssist: { type: "integer" },

        gold: { type: "integer" },
        farm: { type: "integer" },
        idPosition: { type: "integer" },
        idTeamStat: { type: "integer" },
      },
    };
  }
  static get relationMappings() {
    const Champions = require("./Champions");
    const Summoners = require("./Summoners");
    const Positions = require("./Positions");
    const Items = require("./Items");

    return {
      champion: {
        relation: Model.BelongsToOneRelation,
        modelClass: Champions,
        join: {
          from: "championstat.idChampion",
          to: "champion.idChampion",
        },
      },
      summoner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Summoners,
        join: {
          from: "championstat.idSummoner",
          to: "summoner.idSummoner",
        },
      },
      position: {
        relation: Model.BelongsToOneRelation,
        modelClass: Positions,
        join: {
          from: "championstat.idPosition",
          to: "position.idPosition",
        },
      },

      item: {
        relation: Model.ManyToManyRelation,
        modelClass: Items,
        join: {
          from: "championstat.idChampionStat",
          through: {
            from: "championstatitem.idChampionStat",
            to: "championstatitem.idItem",
          },
          to: "item.idItem",
        },
      },
    };
  }
}

module.exports = Championstats;
