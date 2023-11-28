const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/team/all",
    handler: handlers.getAllTeams,
    options: {
      auth: false,
      description: "Gets All Teams",
    },
  },
  {
    method: "GET",
    path: "/team/{idTeam}",
    handler: handlers.getTeam,
    options: {
      auth: false,
      description: "Gets one Teams",
    },
  },
  {
    method: "POST",
    path: "/team",
    handler: handlers.createTeam,
    options: {
      auth: false,
      description: "Create one Teams",
    },
  },
  {
    method: "PATCH",
    path: "/team/{idTeam}",
    handler: handlers.patchTeam,
    options: {
      auth: false,
      description: "Updates one Teams",
    },
  },
  {
    method: "DELETE",
    path: "/team/{idTeam}",
    handler: handlers.deleteTeam,
    options: {
      auth: false,
      description: "Deletes one Teams",
    },
  },
];
