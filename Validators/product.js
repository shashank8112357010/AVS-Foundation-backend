const { body } = require("express-validator");
const productModel = require("../Models/product");


const createProductValidation = [
    body("product_name")
        .notEmpty()
        .withMessage("Please enter product_name ")
        .custom((value) => {
            return productModel.find({
                product_name: value,
            }).then((product) => {
                if (product.length != 0) {
                    return Promise.reject("product with this name already exists!");
                }
                return true;
            });
        }),
    body("income_per_day")
        .notEmpty()
        .withMessage("Please enter income_per_day")
        .isString()
        .withMessage("Please enter a valid income_per_day"),
    body("profit_time")
        .notEmpty()
        .withMessage("Please enter profit_time")
        .isString()
        .withMessage("Please enter a valid profit_time"),
    body("validity_period")
        .notEmpty()
        .withMessage("Please enter validity_period")
        .isString()
        .withMessage("Please enter a valid validity_period"),
    body("total_revenue")
        .notEmpty()
        .withMessage("Please enter total_revenue")
        .isString()
        .withMessage("Please enter a valid total_revenue"),
    body("image")
        .notEmpty()
        .withMessage("Please upload image"),
    body("details")
        .notEmpty()
        .withMessage("Please enter details")
        .isString()
        .withMessage("Please enter a valid details"),
    body("limited")
        .notEmpty()
        .withMessage("Please enter limited time")
        .isString()
        .withMessage("Please enter a valid limited time"),
];

module.exports = {
    createProductValidation
};
