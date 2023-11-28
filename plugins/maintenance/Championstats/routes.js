const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/championstat",
    handler: handlers.getAllChampionstats,
    options: {
      auth: false,
      description: "Gets All Championstats",
    },
  },
  {
    method: "GET",
    path: "/championstat/{idChampionStat}",
    handler: handlers.getChampionstat,
    options: {
      auth: false,
      description: "Gets one Championstats",
    },
  },
  {
    method: "POST",
    path: "/championstat",
    handler: handlers.createChampionstat,
    options: {
      auth: false,
      description: "Create one Championstats",
    },
  },
  {
    method: "PATCH",
    path: "/championstat/{idChampionStat}",
    handler: handlers.patchChampionstat,
    options: {
      auth: false,
      description: "Updates one Championstats",
    },
  },
  {
    method: "DELETE",
    path: "/championstat/{idChampionStat}",
    handler: handlers.deleteChampionstat,
    options: {
      auth: false,
      description: "Deletes one Championstats",
    },
  },
];
