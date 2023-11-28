const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/role/all",
    handler: handlers.getAllRoles,
    options: {
      auth: false,
      description: "Gets All Roles",
    },
  },
  {
    method: "GET",
    path: "/role/{idRole}",
    handler: handlers.getRole,
    options: {
      auth: false,
      description: "Gets one Roles",
    },
  },
  {
    method: "POST",
    path: "/role",
    handler: handlers.createRole,
    options: {
      auth: false,
      description: "Create one Roles",
    },
  },
  {
    method: "PATCH",
    path: "/role/{idRole}",
    handler: handlers.patchRole,
    options: {
      auth: false,
      description: "Updates one Roles",
    },
  },
  {
    method: "DELETE",
    path: "/role/{idRole}",
    handler: handlers.deleteRole,
    options: {
      auth: false,
      description: "Deletes one Roles",
    },
  },
];
