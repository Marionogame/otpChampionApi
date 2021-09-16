const routes = require("./routes.js");

const after = async (server) => {
  server.route(routes);
};

exports.plugin = {
  name: "user",
  register: async function (server, options) {
    server.dependency(["utils", "database", "socket", "email", "notifications"], after);
  },
};
