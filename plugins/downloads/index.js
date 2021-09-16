const routes = require("./routes.js");

exports.plugin = {
  name: "downloads",
  register: async function (server, options) {
    server.route(routes);
  },
};
