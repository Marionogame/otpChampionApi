const config = require("../../config");
const { Model } = require("objection");
const db = require("./models");
const Knex = require("knex");

exports.plugin = {
  name: "database",
  register: async function (server, options) {
    try {
      const connection = Knex(config.database);
      Model.knex(connection);
      console.log("Database Connected");
      server.app.db = db;
    } catch (err) {
      console.log(err);
    }
  },
};
