const handlers = require("./handlers.js");

module.exports = [
  {
    method: "GET",
    path: "/downloads/{url*}",
    handler: handlers.downloadFiles,
    options: {
      description: "Downloads the media requested in url.",
      tags: ["downloads"],
      auth: false,
    },
  },
];
