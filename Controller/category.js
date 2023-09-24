const { error, validateRes, success } = require("../Helper/baseResponse");
require('dotenv').config();
const categoryModel = require('../Models/category')


// create products api ================>

const createCategory = async (req, res) => {
    try {
        const newCategory = await new categoryModel({...req.body});
        newCategory.save()
        return res.status(201).json(success(' Category Created successfully' , newCategory , 201 ))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const getCategory = async (req, res) => {
    try {
        const Category =await categoryModel.find({});
        return res.status(200).json(success('fetched successfully' , Category , 200 ))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}



module.exports ={createCategory ,getCategory }