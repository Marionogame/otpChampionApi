start = async () => {
  const Hapi = require("@hapi/hapi");
  const config = require("./config");
  const Plugins = require("./plugins");

  const server = Hapi.server(config.server);
  process.env.publicDomain = "";

  server.route({
    method: "*",
    path: "/{p*}",
    handler: (request, h) =>
      h
        .response({
          success: false,
          message: "This route is not defined.",
          data: {},
        })
        .code(404),
    options: { auth: false },
  });

  try {
    process.stdout.write("\033c");
    process.stdin.resume();

    await server.register(Plugins);
    server.route({
      method: "GET",
      path: "/{path*}",
      handler: {
        directory: {
          path: config.assetFolder,
          listing: true,
          index: false,
        },
      },
      options: {
        auth: false,
      },
    });
    await server.start();

    server.events.on("response", function (request) {
      const { info, method, url } = request;
      console.log("\n");
      console.log(new Date().toLocaleString("en-GB"));
      console.log(`${info.remoteAddress}: ${method.toUpperCase()} ${url.pathname}`);
    });

    server.events.on("stop", () => {
      console.log("Server stopped");
      process.exit();
    });

    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
