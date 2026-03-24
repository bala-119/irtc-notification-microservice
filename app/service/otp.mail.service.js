const nodemailer = require("nodemailer");
const OTP = require("../models/otp.model");

class OtpMailService {

    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    async sendMailOtp(email) {

        const otp = this.generateOTP();
        console.log(otp);

        const otpDoc = new OTP({
            email: email,
            otp: otp,
            otp_type: "email-otp",
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        await otpDoc.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your Email OTP for irtc app  is ${otp}`
        };

        await transporter.sendMail(mailOption);

        return { success: true, message: "OTP sent and stored successfully" };
    }
async verifyOtp(email, otp) {

    const otpDoc = await OTP.findOne({
        email,
        otp,
        otp_type: "email-otp"
    });

    if (!otpDoc) {
        throw new Error("Invalid OTP");
    }

    if (otpDoc.expiresAt < new Date()) {
        throw new Error("OTP expired");
    }

    await OTP.deleteOne({ _id: otpDoc._id });

    return {
        success: true,
        message: "OTP verified successfully"
    };
}
async sendResetPasswordOtp(email) {

    const otp = this.generateOTP();

    const otpDoc = new OTP({
        email: email,
        otp: otp,
        otp_type: "reset-password",
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    await otpDoc.save();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password",
        text: `Your password reset OTP is ${otp} it will expire in 10 mins.`
    };

    await transporter.sendMail(mailOption);

    return {
        success: true,
        message: "Reset password OTP sent sucessfully"
    };
}
}

module.exports = new OtpMailService();