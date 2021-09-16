const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Https = require("hapi-require-https");
const Utils = require("./utils");
const Auth = require("./auth");
const Database = require("./database");
const Socket = require("./socket");
const Email = require("./email");
const User = require("./user");
const Downloads = require("./downloads");
const Notifications = require("./notifications");
const Maintenance = require("./maintenance");

module.exports = [
  Inert,
  Vision,
  {
    plugin: Https,
    options: {},
  },
  Utils,
  Auth,
  Database,
  Socket,
  Email,
  User,
  Downloads,
  Notifications,
  ...Maintenance,
];
