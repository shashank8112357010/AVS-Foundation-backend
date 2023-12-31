const express = require('express')
const route = express()
const { createProduct, getProducts, getProductsById, getProductsBycategoryId } = require('../Controller/product');

const {validate} = require('../Middleware/validate');
const { createProductValidation } = require('../Validators/product');

route.post('/createproduct' ,validate(createProductValidation), createProduct);
route.get('/getproducts', getProducts)
route.get('/getproducts/:id', getProductsById)
route.get('/getproductsbycategoryid/:id', getProductsBycategoryId)









module.exports = route
