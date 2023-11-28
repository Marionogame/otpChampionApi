const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/summoner/all",
    handler: handlers.getAllSummoners,
    options: {
      auth: false,
      description: "Gets All Summoners",
    },
  },
  {
    method: "GET",
    path: "/summoner/{idSummoner}",
    handler: handlers.getSummoner,
    options: {
      auth: false,
      description: "Gets one Summoners",
    },
  },
  {
    method: "POST",
    path: "/summoner",
    handler: handlers.createSummoner,
    options: {
      auth: false,
      description: "Create one Summoners",
    },
  },
  {
    method: "PATCH",
    path: "/summoner/{idSummoner}",
    handler: handlers.patchSummoner,
    options: {
      auth: false,
      description: "Updates one Summoners",
    },
  },
  {
    method: "DELETE",
    path: "/summoner/{idSummoner}",
    handler: handlers.deleteSummoner,
    options: {
      auth: false,
      description: "Deletes one Summoners",
    },
  },
];
