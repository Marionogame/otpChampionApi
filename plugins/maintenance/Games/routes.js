const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/game/all",
    handler: handlers.getAllGames,
    options: {
      auth: false,
      description: "Gets All Games",
    },
  },
  {
    method: "GET",
    path: "/game/{idGame}",
    handler: handlers.getGame,
    options: {
      auth: false,
      description: "Gets one Games",
    },
  },
  {
    method: "POST",
    path: "/game",
    handler: handlers.createGame,
    options: {
      auth: false,
      description: "Create one Games",
    },
  },
  {
    method: "PATCH",
    path: "/game/{idGame}",
    handler: handlers.patchGame,
    options: {
      auth: false,
      description: "Updates one Games",
    },
  },
  {
    method: "DELETE",
    path: "/game/{idGame}",
    handler: handlers.deleteGame,
    options: {
      auth: false,
      description: "Deletes one Games",
    },
  },
];
