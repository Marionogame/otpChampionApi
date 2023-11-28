const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/region/all",
    handler: handlers.getAllRegions,
    options: {
      auth: false,
      description: "Gets All Regions",
    },
  },
  {
    method: "GET",
    path: "/region/{idRegion}",
    handler: handlers.getRegion,
    options: {
      auth: false,
      description: "Gets one Regions",
    },
  },
  {
    method: "POST",
    path: "/region",
    handler: handlers.createRegion,
    options: {
      auth: false,
      description: "Create one Regions",
    },
  },
  {
    method: "PATCH",
    path: "/region/{idRegion}",
    handler: handlers.patchRegion,
    options: {
      auth: false,
      description: "Updates one Regions",
    },
  },
  {
    method: "DELETE",
    path: "/region/{idRegion}",
    handler: handlers.deleteRegion,
    options: {
      auth: false,
      description: "Deletes one Regions",
    },
  },
];
