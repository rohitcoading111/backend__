import nodemailer from "nodemailer";
import config from "./config.js"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_APP_PASSWORD,
  },
});

export default transporter;