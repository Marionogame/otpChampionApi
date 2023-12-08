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
      user: "root",
      password: "1234",
      host: "localhost",
      port: 3306,
      database: "mydb",
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
    url: "postgres://marionogame:FbFrDVUysPXQQtNvIvv8oeG4U2JvAKzn@dpg-clp9iih46foc73a80a6g-a.oregon-postgres.render.com/otpchampiondb",
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
      cors: true,
      security: {
        hsts: true,
      },
    },
  },
  email: {
    user: "mario@gmail.com",
    pass: "ikompras2010",
  },

  assetFolder: "C:/MaxMonitorApp/files/",
};

module.exports = config;
