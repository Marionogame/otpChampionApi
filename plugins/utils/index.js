const methods = require("./methods");

exports.plugin = {
  name: "utils",
  register: async function (server, options) {
    server.method(methods);
  },
};
