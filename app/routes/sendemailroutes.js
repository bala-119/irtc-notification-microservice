const express = require("express");
const router = express.Router();
const otpController = require("../controller/otp.mail.controller");
const otpMobileCOntroller = require("../controller/otp.mobile.controller")
const ticketController = require("../controller/ticket.controller")

router.post("/send-email-otp", otpController.sendOtp);
router.post("/verify-email-otp", otpController.verifyEmailOtp);


const otpMobileController = require("../controller/otp.mobile.controller");

router.post("/send-mobile-otp", otpMobileController.sendMobileOtp);
router.post("/verify-mobile-otp",otpMobileCOntroller.verifyMobileOtp);
router.post("/send-reset-password-otp", otpController.sendResetPasswordOtp);
router.post("/send-ticket",ticketController.sendTicket);

module.exports = router;