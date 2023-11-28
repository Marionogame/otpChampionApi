const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/champion/all",
    handler: handlers.getAllChampions,
    options: {
      auth: false,
      description: "Gets All Champions",
    },
  },
  {
    method: "GET",
    path: "/champion/{idChampion}",
    handler: handlers.getChampion,
    options: {
      auth: false,
      description: "Gets one Champions",
    },
  },
  {
    method: "POST",
    path: "/champion",
    handler: handlers.createChampion,
    options: {
      auth: false,
      description: "Create one Champions",
    },
  },
  {
    method: "PATCH",
    path: "/champion/{idChampion}",
    handler: handlers.patchChampion,
    options: {
      auth: false,
      description: "Updates one Champions",
    },
  },
  {
    method: "DELETE",
    path: "/champion/{idChampion}",
    handler: handlers.deleteChampion,
    options: {
      auth: false,
      description: "Deletes one Champions",
    },
  },
];
