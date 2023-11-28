const handlers = require("./handlers.js");
const UserControl = require("./userControl");

const after = async (server) => {
  const io = require("socket.io")(server.listener, {
    transports: ["websocket"],
    cors: {
      origin: "*",
      allowedHeaders: ["Content-Type, Authorization"],
      credentials: true,
    },
    cors: true,
  });

  server.app.socket = io;
  server.app.userControl = new UserControl();
  console.log("Socket Initialized");

  server.app.socket.sockets.on("connect", (client) => {
    //Connect
    handlers.connect(server, client);

    //Disconnect
    client.on("disconnect", () => {
      handlers.disconnect(server, client);
    });
  });
};

exports.plugin = {
  name: "socket",
  register: async function (server, options) {
    server.dependency(["utils", "database"], after);
  },
};
