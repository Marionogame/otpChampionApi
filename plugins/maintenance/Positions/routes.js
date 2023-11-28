const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/position/all",
    handler: handlers.getAllPositions,
    options: {
      auth: false,
      description: "Gets All Positions",
    },
  },
  {
    method: "GET",
    path: "/position/{idPosition}",
    handler: handlers.getPosition,
    options: {
      auth: false,
      description: "Gets one Positions",
    },
  },
  {
    method: "POST",
    path: "/position",
    handler: handlers.createPosition,
    options: {
      auth: false,
      description: "Create one Positions",
    },
  },
  {
    method: "PATCH",
    path: "/position/{idPosition}",
    handler: handlers.patchPosition,
    options: {
      auth: false,
      description: "Updates one Positions",
    },
  },
  {
    method: "DELETE",
    path: "/position/{idPosition}",
    handler: handlers.deletePosition,
    options: {
      auth: false,
      description: "Deletes one Positions",
    },
  },
];
