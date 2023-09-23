const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});


// Define a function to send SMS




// otpSchema.pre("save", async function (next) {
//     // Only send an SMS when a new document is created
//     if (this.isNew) {
//         await sendSms(this.phone, this.otp);
//     }
//     next();
// });
module.exports = categoryModel =  mongoose.model("category", categorySchema)