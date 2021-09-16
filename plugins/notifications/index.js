const { Expo } = require("expo-server-sdk");

const after = async (server) => {
  const expo = new Expo();
  server.app.expoNotifications = expo;
};

exports.plugin = {
  name: "notifications",
  register: async function (server, options) {
    server.dependency(["utils", "database"], after);
  },
};
