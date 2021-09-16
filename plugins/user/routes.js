const handlers = require("./handlers.js");

module.exports = [
  {
    method: "POST",
    path: "/user/register",
    handler: handlers.register,
    options: {
      description: "Registers a user into the system.",
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/user/login",
    handler: handlers.login,
    options: {
      description: "Authenticates a given user into the system.",
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/user/rehydrate",
    handler: handlers.rehydrate,
    options: {
      description: "Get all the changes for a specific User for mobile.",
    },
  },
  {
    method: "POST",
    path: "/user/forgotPassword",
    handler: handlers.forgotPassword,
    options: {
      description: "Initiates the process of password reset for a user.",
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/user/resetPassword",
    handler: handlers.resetPassword,
    options: {
      description: "Completes the process of password reset for a user.",
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/user/logout",
    handler: handlers.logout,
    options: {
      description: "Disconnects User from the site.",
    },
  },
];
