require('dotenv').config();
const client = require('twilio')(process.env.twilio_accountSid, process.env.twilio_authToken);


const sendSms = (number, otp) => {
    try {
       return  client.messages
            .create({
                body: `Dear user, Your OTP is ${otp} for adding your name and details to for Valid for 5 minutes. Please do not share this OTP. Regards, AVS Foundation`,
                from: '+12568417085',
                to: `+91${number}`
            })
            .then(message =>console.log(  "SMS API ==========>", message.sid))
            .done();
    }
    catch (err) {
        return err.message
    }
}

module.exports = sendSms; 














