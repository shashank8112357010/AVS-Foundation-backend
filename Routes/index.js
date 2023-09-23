const express = require('express');
const route =  express()
const userRoutes = require('./user');
const productRoutes = require('./products')

route.use('/user', userRoutes);
route.use('/product', productRoutes);


module.exports = route;
