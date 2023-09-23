const { error, validateRes, success } = require("../Helper/baseResponse");
const generateOtp = require("../Helper/generateOtp");
const otpModel = require('../Models/otp');
const userModel = require('../Models/user');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const generateRefral = require("../Helper/generateRefral");
const referralModel = require('../Models/referral')
var QRCode = require('qrcode')





// user api's 

const registerUser = async (req, res) => {
    try {
        const { otp, phone, password, referral } = req.body;
        const findOTP = await otpModel.findOne({ phone: phone });
        if (!findOTP) return res.status(422).json(validateRes("Opt expired"))
        if (findOTP.otp != otp) return res.status(422).json(validateRes("Invalid OTP"));
        const newUser = await new userModel({ phone, password, referral });
        newUser.save();
        const newreferral = `http://localhost:3000/register/${generateRefral(6)}`
        const userReferral = await new referralModel({ phone, referral: newreferral });
        userReferral.save()
        return res.status(201).json(success('user registered successfully', [], 201))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const verifyPhoneNumber = async (req, res) => {
    try {
        const { phone } = req.body;
        const otp = generateOtp(6);
        const newOTP = await new otpModel({ phone, otp });
        newOTP.save();
        return res.status(201).json(success("Otp send successfully", [], 201))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        // if(!phone || phone.length !=10) return res.status(422).json(validateRes("Phone enter valid phone number "));
        const user = await userModel.findOne({ phone });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)return res.status(400).json(error("Wrong Password Entered", 400));
        const payload = { _id: user._id, isAdmin: user.isAdmin, phone: user.phone };
        console.log(process.env.JWT_SECRET_KEY);
        const jwt_token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);
        console.log(user);
        let userPayload = {
            phone: user.phone,
            token: jwt_token,
        };
        return res.status(200).json(success("Logged in successfully", userPayload, 200));
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const forgotpassword = async (req, res) => {
    try {
        const { otp, phone, password, cnfpassword } = req.body;
        if (password != cnfpassword) return res.status(422).json(validateRes("Password and confirm password does't match"))
        const findOTP = await otpModel.findOne({ phone: phone });
        if (!findOTP) return res.status(422).json(validateRes("Opt expired"))
        console.log(findOTP);
        if (findOTP.otp != otp) return res.status(422).json(validateRes("Invalid OTP"));
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);
        await userModel.findOneAndUpdate({ phone }, { password: securedPassword }, { new: true });
        return res.status(201).json(success('Password has been changed', [], 201))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const getreferrallink = async (req, res) => {
    try {
        const { phone } = req.params;
        if (!phone) return res.status(422).json(validateRes("phone number is required"))
        const link = await referralModel.find({ phone });
        return res.status(200).json(success("Referral link", { link: link[0]?.referral }, 200))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const getQrCode = async (req, res) => {
    try {
        const { phone } = req.params;

        if (!phone) return res.status(422).json(validateRes("phone number is required"))
        const link = await referralModel.find({ phone });
        console.log(link[0]?.referral);
        QRCode.toDataURL(link[0]?.referral, function (err, url) {
            console.log("url===>", url);
        })
        QRCode.toString(link[0]?.referral, { type: 'terminal' }, function (err, url) {
            console.log(url);
            return res.status(200).json(success("QR fetched successfully", [url], 200))
        })


    } catch (err) {
        return res.status(500).json(error(err.message, 200))
    }
}

const changepassword = async (req, res) => {
    try {
        const { oldpassword, newpassword, confirmnewpassword, phone } = req.body;
        const [user] = await userModel.find({ phone });
        console.log(user);
        const isoldPasswordCorrect = await bcrypt.compare(oldpassword, user.password);
        console.log(isoldPasswordCorrect);
        if (!isoldPasswordCorrect) return res.status(422).json(error("Old password is incorrect", 422))
        else {
            if (newpassword != confirmnewpassword) return res.status(422).json(error("password and confirm password does't match"));
            else {
                const salt = await bcrypt.genSalt(10);
                const securedPassword = await bcrypt.hash(newpassword, salt);
                await userModel.findOneAndUpdate({ phone }, { password: securedPassword }, { new: true });
                return res.status(201).json(success('Password has been changed', [], 201))

            }

        }



    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}




module.exports = {
    registerUser,
    verifyPhoneNumber,
    loginUser,
    forgotpassword,
    getreferrallink,
    getQrCode,
    changepassword
}






