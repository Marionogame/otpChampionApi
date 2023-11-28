const routes = require("./routes");

const after = async (server) => {
  server.route(routes);
};

exports.plugin = {
  name: "Roles",
  register: async function (server, options) {
    server.dependency(["utils", "database", "socket", "email", "notifications"], after);
  },
};
