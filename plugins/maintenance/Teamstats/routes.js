const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/teamstat",
    handler: handlers.getAllTeamstats,
    options: {
      auth: false,
      description: "Gets All Teamstats",
    },
  },
  {
    method: "GET",
    path: "/teamstat/{idTeamstat}",
    handler: handlers.getTeamstat,
    options: {
      auth: false,
      description: "Gets one Teamstats",
    },
  },
  {
    method: "POST",
    path: "/teamstat",
    handler: handlers.createTeamstat,
    options: {
      auth: false,
      description: "Create one Teamstats",
    },
  },
  {
    method: "PATCH",
    path: "/teamstat/{idTeamstat}",
    handler: handlers.patchTeamstat,
    options: {
      auth: false,
      description: "Updates one Teamstats",
    },
  },
  {
    method: "DELETE",
    path: "/teamstat/{idTeamstat}",
    handler: handlers.deleteTeamstat,
    options: {
      auth: false,
      description: "Deletes one Teamstats",
    },
  },
];
