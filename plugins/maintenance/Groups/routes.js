const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/groups",
    handler: handlers.getAllGroups,
    options: {
      description: "Gets All Groups",
    },
  },
  {
    method: "GET",
    path: "/groups/{groupId}",
    handler: handlers.getGroup,
    options: {
      description: "Gets One Group",
    },
  },
  {
    method: "POST",
    path: "/groups",
    handler: handlers.createGroup,
    options: {
      description: "Create Group",
    },
  },
  {
    method: "PATCH",
    path: "/groups/{groupId}",
    handler: handlers.patchGroup,
    options: {
      description: "Updates one Group",
    },
  },
  {
    method: "DELETE",
    path: "/groups/{groupId}",
    handler: handlers.deleteGroup,
    options: {
      description: "Deletes one Group",
    },
  },
];
