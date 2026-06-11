import nodemailer from "nodemailer";

let transporter = null;

export const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    transporter.verify((error) => {
      if (error) {
        console.log(
          "❌ SMTP Error:",
          error.message
        );
      } else {
        console.log(
          "✅ Email server ready"
        );
      }
    });
  }

  return transporter;
};