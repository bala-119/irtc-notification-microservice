const mongoose = require('mongoose');

class OtpModel {
    constructor() {
        const otpSchema = new mongoose.Schema(
            {
                otp: { type: String, required: true },
                otp_type: { type: String, enum: ['mobile-otp', 'email-otp'], required: true },
                email: { type: String }, 
                phone: { type: String }, 
                expiresAt: { type: Date, required: true } 
            },
            {
                timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
            }
        );

        this.model = mongoose.model('Otp', otpSchema);
    }

    getModel() {
        return this.model;
    }
}

module.exports = new OtpModel().getModel();