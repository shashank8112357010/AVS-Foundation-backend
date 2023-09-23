const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    phone: {
        type: String,
    
    },
    productId: [String],
});


// Define a function to send SMS




// orderSchema.pre("save", async function (next) {
//     // Only send an SMS when a new document is created
//     if (this.isNew) {
//         await sendSms(this.phone, this.otp);
//     }
//     next();
// });
module.exports = orderModel =  mongoose.model("orders", orderSchema);