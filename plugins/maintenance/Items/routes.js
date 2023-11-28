const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/item/all",
    handler: handlers.getAllItems,
    options: {
      auth: false,
      description: "Gets All Items",
    },
  },
  {
    method: "GET",
    path: "/item/{idItem}",
    handler: handlers.getItem,
    options: {
      auth: false,
      description: "Gets one Items",
    },
  },
  {
    method: "POST",
    path: "/item",
    handler: handlers.createItem,
    options: {
      auth: false,
      description: "Create one Items",
    },
  },
  {
    method: "PATCH",
    path: "/item/{idItem}",
    handler: handlers.patchItem,
    options: {
      auth: false,
      description: "Updates one Items",
    },
  },
  {
    method: "DELETE",
    path: "/item/{idItem}",
    handler: handlers.deleteItem,
    options: {
      auth: false,
      description: "Deletes one Items",
    },
  },
];
