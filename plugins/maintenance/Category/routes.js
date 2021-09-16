const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/category",
    handler: handlers.getAllCategories,
    options: {
      description: "Gets All Categories",
    },
  },
  {
    method: "GET",
    path: "/category/{categoryId}",
    handler: handlers.getCategory,
    options: {
      description: "Gets one Category",
    },
  },
  {
    method: "POST",
    path: "/category",
    handler: handlers.createCategory,
    options: {
      description: "Create one Category",
    },
  },
  {
    method: "PATCH",
    path: "/category/{categoryId}",
    handler: handlers.patchCategory,
    options: {
      description: "Updates one Category",
    },
  },
  {
    method: "DELETE",
    path: "/category/{categoryId}",
    handler: handlers.deleteCategory,
    options: {
      description: "Deletes one Category",
    },
  },
];
