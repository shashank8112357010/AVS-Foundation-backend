const mongoose = require('mongoose');
const sendSms = require('../Helper/sendSms')

const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});


// Define a function to send SMS




otpSchema.pre("save", async function (next) {
    // Only send an SMS when a new document is created
    if (this.isNew) {
        await sendSms(this.phone, this.otp);
    }
    next();
});
module.exports = otpModel =  mongoose.model("OTP", otpSchema)