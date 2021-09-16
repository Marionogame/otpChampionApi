const fs = require("fs");

// let ca = [];
// let chain = fs.readFileSync("C:/ssl/server.ca-bundle", "utf8");
// chain = chain.split("\n");
// let cert = [];

// for (_i = 0, _len = chain.length; _i < _len; _i++) {
//   line = chain[_i];
//   if (!(line.length !== 0)) {
//     continue;
//   }
//   cert.push(line);
//   if (line.match(/-END CERTIFICATE-/)) {
//     ca.push(cert.join("\n"));
//     cert = [];
//   }
// }

const config = {
  database: {
    client: "mysql2",
    version: "8.0.22",
    connection: {
      user: "Eduardo",
      password: "123456",
      host: "142.44.139.4",
      port: 3306,
      database: "max",
      typeCast: function (field, next) {
        if (field.type === "TINY" && field.length == 1) {
          return field.string() === "1";
        }
        return next();
      },
    },
    pool: {
      max: 1000,
      min: 0,
      idleTimeoutMillis: 15000,
    },
  },
  server: {
    port: 8000,
    host: "0.0.0.0",
    // tls: {
    //   ca,
    //   key: fs.readFileSync("c:/ssl/private.pem"),
    //   cert: fs.readFileSync("c:/ssl/cert.pem"),
    // },
    router: { isCaseSensitive: false },
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match"],
        additionalHeaders: ["userId", "userName", "platform"],
      },
      security: {
        hsts: true,
      },
    },
  },
  email: {
    user: "info.maxmonitor@gmail.com",
    pass: "ikompras2010",
  },
  assetFolder: "C:/MaxMonitorApp/files/",
};

module.exports = config;
