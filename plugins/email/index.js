const nodemailer = require("nodemailer");
const { email } = require("../../config");

const after = async (server) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: email,
  });
  console.log("Email Connected");
  server.app.emailer = transporter;
};

exports.plugin = {
  name: "email",
  register: async function (server, options) {
    server.dependency(["utils", "database"], after);
  },
};
