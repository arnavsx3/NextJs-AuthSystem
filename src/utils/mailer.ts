import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendMail = async (from:string, to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};
