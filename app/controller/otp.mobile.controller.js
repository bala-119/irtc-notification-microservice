const OtpMobileService = require("../service/otp.mobile.service");

class OtpMobileController {

    async sendMobileOtp(req, res) {
        try {

            const { phone } = req.body;

            if (!phone) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number is required"
                });
            }

            await OtpMobileService.sendMobileOtp(phone);

            res.json({
                success: true,
                message: "Mobile OTP sent successfully"
            });

        } catch (error) {

            console.error("ERROR:", error);

            res.status(500).json({
                success: false,
                message: "Server error"
            });

        }
    }


    async verifyMobileOtp(req, res) {

        try {

            const { phone, otp } = req.body;

            console.log(phone, otp);

            if (!phone || !otp) {
                return res.status(400).json({
                    success: false,
                    message: "Phone and OTP required"
                });
            }

            const result = await OtpMobileService.verifyMobileOtp(phone, otp);

            res.json(result);

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new OtpMobileController();