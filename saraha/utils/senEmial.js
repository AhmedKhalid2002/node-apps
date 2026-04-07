import nodemailer from 'nodemailer';

export function sendEmail({ to, subject, text, html }) {
  //^ transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //^ receiver
  const info = transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  if (info.accepted.length > 0) return true;
  return false;
}
