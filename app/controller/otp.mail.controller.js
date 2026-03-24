const OtpMailService = require("../service/otp.mail.service");

class OtpController {

    async sendOtp(req, res) {
        try {

            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required"
                });
            }

            await OtpMailService.sendMailOtp(email);

            res.json({
                success: true,
                message: "OTP sent successfully"
            });

        } catch (error) {

            console.error("ERROR:", error);

            res.status(500).json({
                success: false,
                message: "Server error"
            });

        }
    }


    // ADD THIS METHOD
    async verifyEmailOtp(req, res) {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email...... and OTP required"
            });
        }
        console.log("OTP mail");
        const result = await OtpMailService.verifyOtp(email, otp);
        console.log(result);

        return res.status(200).json({
            success: true,
            message: "verified successfully",
            data: result
        });

    } catch (error) {
    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong"
    });


    }
}
    async sendResetPasswordOtp(req, res) {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        await OtpMailService.sendResetPasswordOtp(email);

        res.json({
            success: true,
            message: "Reset password OTP sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

}

module.exports = new OtpController();