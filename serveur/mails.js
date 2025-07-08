const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.creawebhosting.org",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "",
    pass: "",
  },
});

module.exports = transporter;


