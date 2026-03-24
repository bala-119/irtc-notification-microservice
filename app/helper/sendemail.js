const nodemailer = require("nodemailer");

const sendMail = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  });

  await transporter.sendMail({
    from: process.env.user,
    to: email,
    subject: "Email Verification OTP",
    text: `Your Email OTP is ${otp}`
  });

};

module.exports = sendMail;