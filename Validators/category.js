const { body } = require("express-validator");
const categoryModel = require("../Models/category");


const createCategoryValidation = [
    body("name")
        .notEmpty()
        .withMessage("Please enter category name  ")
        .custom((value) => {
            return categoryModel.find({
                name: value,
            }).then((category) => {
                if (category.length != 0) {
                    return Promise.reject("Category with this name already exists!");
                }
                return true;
            });
        }),
   
];

module.exports = {createCategoryValidation}
