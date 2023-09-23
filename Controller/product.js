const { error, validateRes, success } = require("../Helper/baseResponse");
require('dotenv').config();
const productModel = require('../Models/product')


// create products api ================>

const createProduct = async (req, res) => {
    try {
        console.log(new productModel());
        const newProduct = await new productModel({...req.body});
        newProduct.save()
        console.log("hey" , newProduct);
        return res.status(201).json(success('Created successfully' , newProduct , 201 ))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const getProducts = async (req, res) => {
    try {
        const Products =await productModel.find({});
        return res.status(200).json(success('fetched successfully' , Products , 200 ))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const getProductsById = async (req, res) => {
    try {
        const {id} = req.params;
        const Products =await productModel.find({_id : id});
        return res.status(200).json(success('fetched successfully' , Products , 200 ))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}
const getProductsBycategoryId = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(422).json(error("Category Id is required"))
        const Products =await productModel.find({categoryId : id});
        return res.status(200).json(success('fetched successfully by category id ' , Products , 200 ))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}



module.exports ={createProduct ,getProducts , getProductsById ,getProductsBycategoryId}