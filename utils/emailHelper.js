const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: parseInt(process.env.SMTP_PORT) == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function main(option) {
  const obj = {
    from: process.env.SMTP_USER,
    to: option.email, // it could be a list of email addresses
    subject: option.subject,
    text: option?.message, // optional
    html: option?.html, // optional
  };
  return await transporter.sendMail(obj);
}

module.exports = main;
