const twilio = require("twilio");
const OTP = require("../models/otp.model");

class OtpMobileService {

    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    async sendMobileOtp(phone) {

        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        const otp = this.generateOTP();

        const otpDoc = new OTP({
            phone: phone,
            otp: otp,
            otp_type: "mobile-otp",
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        await otpDoc.save();

        await client.messages.create({
            body: `Your Mobile OTP for irtc is ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: phone
        });

        return {
            success: true,
            message: "OTP sent successfully for mobile"
        };
    }

    async verifyMobileOtp(phone, otp) {

    const otpDoc = await OTP.findOne({
        phone: phone,
        otp: otp,
        otp_type: "mobile-otp"
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
        message: "OTP verified successfully via mobile"
    };
}
}

module.exports = new OtpMobileService();