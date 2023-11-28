const { Model } = require("objection");

class Championstatitems extends Model {
  static get tableName() {
    return "championstatitem";
  }

  // static get idColumn() {
  //   return "idchampionstatitem";
  // }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["idChampionStat", "idItem"],
      properties: {
        idChampionStat: { type: "integer" },
        idItem: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Items = require("./Items.js");
    const Championstats = require("./Championstats.js");

    return {
      region: {
        relation: Model.BelongsToOneRelation,
        modelClass: Items,
        item: {
          from: "championstatitem.idItem",
          to: "item.idItem",
        },
      },
      championstat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Championstats,
        join: {
          from: "championstatitem.idChampionStat",
          to: "championstat.idChampionStat",
        },
      },
    };
  }
}

module.exports = Championstatitems;
