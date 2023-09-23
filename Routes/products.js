const express = require('express')
const route = express()
const { createProduct, getProducts, getProductsById } = require('../Controller/product');

const {validate} = require('../Middleware/validate');
const { createProductValidation } = require('../Validators/product');

route.post('/createproduct' ,validate(createProductValidation), createProduct);
route.get('/getproducts', getProducts)
route.get('/getproducts/:id', getProductsById)








module.exports = route
