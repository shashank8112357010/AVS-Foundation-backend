const { body } = require("express-validator");
const userModel = require("../Models/user");


const createUser = [
    body("phone")
        .notEmpty()
        .withMessage("Please enter phone number ")
        .isNumeric()
        .withMessage("Please enter a valid phone")
        .custom((value) => {
            return userModel.find({
                phone: value,
            }).then((user) => {
                if (user.length != 0) {
                    return Promise.reject("User with this phone number already exists!");
                }
                return true;
            });
        }),
    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .isString()
        .withMessage("Please enter a valid password"),
];

const signUser = [
    body("phone")
        .notEmpty()
        .withMessage("Please enter phone number ")
        .isNumeric()
        .withMessage("Please enter a valid phone")
        .custom((value) => {
            return userModel.find({
                phone: value,
            }).then((user) => {
                if (user.length === 0) {
                    console.log(user);
                    return Promise.reject("User with this phone number does not  exists!");
                }
                return true;
            });
        }),
    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .isString()
        .withMessage("Please enter a valid password"),
];

const forgotUser = [
    body("phone")
        .notEmpty()
        .withMessage("Please enter phone number ")
        .isNumeric()
        .withMessage("Please enter a valid phone")
        .custom((value) => {
            return userModel.find({
                phone: value,
            }).then((user) => {
                if (user.length === 0) {
                    console.log(user);
                    return Promise.reject("User with this phone number does not  exists!");
                }
                return true;
            });
        }),
    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .isString()
        .withMessage("Please enter a valid password"),
    body("cnfpassword")
        .notEmpty()
        .withMessage("Please enter confirm password"),

    body("otp").notEmpty()
        .withMessage("Please enter OTP")

];


module.exports = {
    createUser,
    signUser,
    forgotUser
};
