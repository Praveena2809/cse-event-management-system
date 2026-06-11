import { getTransporter } from "../config/mailer.js";

export const sendEmail = async ({
  to,
  subject,
  text = "",
  html = "",
  attachments = [],
}) => {
  try {
    const transporter =
      getTransporter();

    const info =
      await transporter.sendMail({
        from:
          process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
        attachments,
      });

    console.log(
      "✅ Email sent:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "Email sending failed:",
      error.message
    );
  }
};