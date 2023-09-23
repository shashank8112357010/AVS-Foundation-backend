const express = require('express');
const route =  express()
const userRoutes = require('./user');
const productRoutes = require('./products')
const categoryRoutes = require('./category')


route.use('/user', userRoutes);
route.use('/product', productRoutes);
route.use('/category', categoryRoutes);



module.exports = route;
