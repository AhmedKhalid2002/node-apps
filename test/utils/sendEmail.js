import nodemailer from 'nodemailer';
export const sendEmail = (to, subject, text, html) => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //   reciver

  const info = transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  if (info.accepted.length > 0) return true;
  return false;
};
