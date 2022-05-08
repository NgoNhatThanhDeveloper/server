import nodemailer from "nodemailer";
import Promise from "bluebird";
import * as config from "../config/email.js";
export const sendEmail = (email, textContent) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(config.transporterSetup());
    transporter
      .sendMail(config.mainOptionsSetup(email, "Công Ty Hảo Cảnh", textContent))
      .then(
        () => {
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
  });
};
