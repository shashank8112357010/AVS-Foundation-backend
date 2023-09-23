const mongoose = require('mongoose');


const referralSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    referral: {
        type: String,
        required: true,
    },
}, { timestamp: true });


// Define a function to send SMS






module.exports = referralModel = mongoose.model("referral", referralSchema)