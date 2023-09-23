const express = require('express')
const route = express()
const { registerUser, verifyPhoneNumber, loginUser, forgotpassword, getreferrallink, getQrCode } = require('../Controller/user');
const { createUser ,signUser, forgotUser  } = require('../Validators/user');
const {validate} = require('../Middleware/validate')



route.post('/createuser', validate(createUser), registerUser);
route.post('/verifyPhoneNumber', verifyPhoneNumber)
route.post('/signuser',validate(signUser), loginUser);
route.post('/resetpassword', validate(forgotUser) , forgotpassword);
route.get('/getinvitationlink/:phone' , getreferrallink);
route.get('/getQRCode/:phone' , getQrCode);







module.exports = route
