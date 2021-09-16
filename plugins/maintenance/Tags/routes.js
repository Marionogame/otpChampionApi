const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/tags",
    handler: handlers.getAllTags,
    options: {
      description: "Gets All Tags",
    },
  },
  {
    method: "GET",
    path: "/tags/{tagId}",
    handler: handlers.getTag,
    options: {
      description: "Gets One Tag",
    },
  },
  {
    method: "POST",
    path: "/tags",
    handler: handlers.createTag,
    options: {
      description: "Create Tag",
    },
  },
  {
    method: "PATCH",
    path: "/tags/{tagId}",
    handler: handlers.patchTag,
    options: {
      description: "Updates one Tag",
    },
  },
  {
    method: "DELETE",
    path: "/tags/{tagId}",
    handler: handlers.deleteTag,
    options: {
      description: "Deletes one Tag",
    },
  },
];
