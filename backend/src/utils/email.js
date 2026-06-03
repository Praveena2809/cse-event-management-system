import { createTransporter } from "../config/mailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

