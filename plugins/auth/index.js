const jwtPlugin = require("hapi-auth-jwt2");

exports.plugin = {
  name: "auth",
  register: async function (server, options) {
    await server.register(jwtPlugin);

    server.app.secretKey = "iK2020Secret";

    server.auth.strategy("jwtStrategy", "jwt", {
      key: server.app.secretKey,
      validate: async (decoded, request, h) => {
        return { isValid: true };
      },
      verifyOptions: { algorithms: ["HS256"] },
    });

    server.auth.default("jwtStrategy");
  },
};
